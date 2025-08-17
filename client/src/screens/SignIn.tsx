import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import CommonButton from '../components/CommonButton';
import COLORS from '../constants/colors';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthAction, type RootStackParamList } from '../types/auth';
import { loginUser } from '../services/api';
import { isEmailValid, isPasswordValid } from '../utils/validators';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../components/CustomHeader';
import CornerCurves from '../components/CornerCurves';
import { commonStyles } from '../constants/appStyles';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      setEmailError('Invalid email address');
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError(
        'Password must be at least 10 characters, contain @, a number, and an uppercase letter.',
      );
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      if (response.status === 200) {
        navigation.navigate('OtpVerification', {
          email: email,
          action: AuthAction.LOGIN,
        });
      } else {
        Alert.alert(
          'Login Failed',
          response.data.message || 'Something went wrong',
        );
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.appWrapper}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center' }}>
            <CustomHeader />
          </View>

          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Welcome back</Text>

            <Text style={styles.subtitle}>
              Lorem ipsum dolor sit amet consectetur. In pharetra placerat lorem
              enim felis enim id tortor morbi.
            </Text>

            <View style={{ width: '100%' }}>
              <FormInput
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={val => {
                  setEmail(val);
                  setEmailError(
                    isEmailValid(val) ? '' : 'Invalid email address',
                  );
                }}
                error={emailError}
              />

              <FormInput
                placeholder="Password"
                isPassword
                value={password}
                onChangeText={val => {
                  setPassword(val);
                  setPasswordError(
                    isPasswordValid(val)
                      ? ''
                      : 'Password must be at least 10 characters, contain @, a number, and an uppercase letter.',
                  );
                }}
                error={passwordError}
              />

              {/* Language Dropdown (static) */}
              <View style={styles.dropdownBox}>
                <Text style={styles.dropdownText}>English / English</Text>
                <Icon name="arrow-drop-down" size={24} color="#666" />
              </View>
            </View>

            <CommonButton
              title="Sign in"
              onPress={handleLogin}
              loading={loading}
            />

            <Text style={styles.resetPassword}>Reset password</Text>

            <Text style={styles.bottomText}>
              <Text onPress={onSignUpPress} style={styles.signup}>
                Sign Up{' '}
              </Text>
              <Text>Create a new account?</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#555',
  },
  dropdownBox: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 6,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.text,
  },
  resetPassword: {
    marginTop: 16,
    color: COLORS.primary,
  },
  bottomText: {
    marginTop: 16,
    fontSize: 14,
  },
  signup: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});
