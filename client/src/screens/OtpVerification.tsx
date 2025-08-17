import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/auth';
import { AuthAction } from '../types/auth';

import { setItem, StorageKeys } from '../utils/storage';
import { verifyOtp } from '../services/api';
import { useDispatch } from 'react-redux';
import COLORS from '../constants/colors';
import { setToken } from '../redux/authSlice';
import CustomHeader from '../components/CustomHeader';
import { commonStyles } from '../constants/appStyles';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OtpVerification'
>;

export default function OtpVerification() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef<TextInput[]>([]);
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const route = useRoute();
  const { email, action } = route.params as {
    email: string;
    action: AuthAction;
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6 || otp.some(d => d === '')) {
      return Alert.alert('Invalid OTP', 'Enter 6-digit code');
    }

    try {
      const res = await verifyOtp({ email, action, code });
      const token = res.data.token || '';
      if (token) {
        await setItem(StorageKeys.TOKEN, token);
        if (action === AuthAction.REGISTER) {
          navigation.navigate('Success');
          return;
        }
        dispatch(setToken(token));
      }
    } catch (err: any) {
      Alert.alert('OTP Failed', err.response?.data?.message || 'Invalid');
    }
  };

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) {
        inputsRef.current[index + 1].focus();
      }
      if (!text && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    // TODO: Call resend API here
    setTimer(30);
    Alert.alert('OTP resent to your email');
  };

  // Text blocks conditionally rendered
  const renderHeaderText = () => {
    if (action === AuthAction.REGISTER) {
      return (
        <>
          <Text style={styles.title}>Verify your account</Text>
          <Text style={styles.subtitle}>
            We have sent a verification code on your email {email}. Please check
            and enter it below.
          </Text>
        </>
      );
    } else if (action === AuthAction.LOGIN) {
      return (
        <>
          <Text style={styles.title}>Authentication code</Text>
          <Text style={styles.subtitle}>
            Your account is protected by an authenticator, please enter the code
            generated.
          </Text>
        </>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={commonStyles.appWrapper}
    >
      <View style={{ alignItems: 'center' }}>
        <CustomHeader />
      </View>

      {/* Center everything else */}
      <View style={styles.centeredContent}>
        {renderHeaderText()}

        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={el => {
                if (el) inputsRef.current[idx] = el;
              }}
              value={digit}
              onChangeText={text => handleChange(text, idx)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpBox}
              textAlign="center"
              autoFocus={idx === 0}
              returnKeyType="done"
            />
          ))}
        </View>

        <Text style={[styles.timerText]}>
          {`00:${timer < 10 ? `0${timer}` : timer}`}
        </Text>

        <TouchableOpacity
          disabled={timer > 0}
          onPress={handleResend}
          style={{ marginTop: 20 }}
        >
          <Text style={[styles.resendText, { color: COLORS.primary }]}>
            Resend Code
          </Text>
        </TouchableOpacity>

        {/* Additional line only for login */}
        {action === AuthAction.LOGIN && (
          <Text style={[styles.lostAccessText]}>
            Have you lost access to your phone number or authenticator?
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 13,
    color: '#666',
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  otpBox: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    fontSize: 22,
    color: '#000',
  },
  timerText: {
    color: COLORS.border,
    alignSelf: 'flex-end',
    width: '20%',
    marginTop: 10,
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
  },
  lostAccessText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.primary,
    // textDecorationLine: 'underline',
  },
});
