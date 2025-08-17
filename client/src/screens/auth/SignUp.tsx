import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isUsernameValid,
} from '../../utils/validators';
import { AuthAction, RootStackParamList } from '../../types/auth';

import FormInput from '../../components/FormInput';
import CommonButton from '../../components/CommonButton';
import COLORS from '../../constants/colors';
import CustomHeader from '../../components/CustomHeader';
import { commonStyles } from '../../constants/appStyles';
import { useDispatch } from 'react-redux';
import { setItem, StorageKeys } from '../../utils/storage';
import { setToken } from '../../redux/authSlice';
import { registerUser } from '../../services/auth.service';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export default function SignUp() {
  const dispatch = useDispatch();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [form, setForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    tos_accept: false,
    privacy_policy_accept: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const toggleTOS = () =>
    setForm(prev => ({ ...prev, tos_accept: !prev.tos_accept }));

  const togglePrivacy = () =>
    setForm(prev => ({
      ...prev,
      privacy_policy_accept: !prev.privacy_policy_accept,
    }));

  const handleSubmit = async () => {
    if (!isEmailValid(form.email)) {
      // Alert.alert('Invalid Email');
      return;
    }

    if (!isPasswordValid(form.password)) {
      Alert.alert(
        'Password must be at least 10 characters, contain @, a number, and an uppercase letter.',
      );
      return;
    }

    if (form.password !== form.confirm_password) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (!form.tos_accept || !form.privacy_policy_accept) {
      Alert.alert('Please accept Terms and Privacy Policy');
      return;
    }

    try {
      setLoading(true);
      const {
        confirm_password,
        tos_accept,
        privacy_policy_accept,
        ...payload
      } = form;

      const response = await registerUser(payload);
      console.log(response);
      if (response.success) {
        const token = response.token || '';
        await setItem(StorageKeys.TOKEN, token);
        await setItem(StorageKeys.USER, JSON.stringify(response.data));
        dispatch(setToken(token));
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Registration failed',
      );
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={commonStyles.appWrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <CustomHeader />
          </View>

          <View style={styles.centerContent}>
            <Text style={styles.title}>Get started</Text>
            <Text style={styles.subtitle}>
              Lorem ipsum dolor sit amet consectetur. In pharetra placerat lorem
              enim felis enim id tortor morbi.
            </Text>
            <View style={{ width: '100%' }}>
              <FormInput
                placeholder="First Name"
                required
                value={form.first_name}
                error={errors.first_name}
                onChangeText={val => {
                  setForm({ ...form, first_name: val });
                  setErrors(prev => ({
                    ...prev,
                    first_name:
                      val.trim().length >= 2
                        ? ''
                        : 'Minimum 2 characters required',
                  }));
                }}
              />

              <FormInput
                placeholder="Last Name"
                required
                value={form.last_name}
                error={errors.last_name}
                onChangeText={val => {
                  setForm({ ...form, last_name: val });
                  setErrors(prev => ({
                    ...prev,
                    last_name:
                      val.trim().length >= 2
                        ? ''
                        : 'Minimum 2 characters required',
                  }));
                }}
              />

              {/* <FormInput
                placeholder="Username"
                required
                value={form.username}
                error={errors.username}
                onChangeText={val => {
                  setForm({ ...form, username: val });
                  setErrors(prev => ({
                    ...prev,
                    username:
                      val.trim().length >= 4
                        ? ''
                        : 'Minimum 4 characters required',
                  }));
                }}
              /> */}

              <FormInput
                placeholder="Email"
                required
                value={form.email}
                error={errors.email}
                onChangeText={val => {
                  setForm({ ...form, email: val });
                  setErrors(prev => ({
                    ...prev,
                    email: isEmailValid(val) ? '' : 'Invalid email',
                  }));
                }}
              />

              <FormInput
                placeholder="Password"
                required
                secureTextEntry
                isPassword
                value={form.password}
                error={errors.password}
                onChangeText={val => {
                  setForm({ ...form, password: val });
                  setErrors(prev => ({
                    ...prev,
                    password: isPasswordValid(val)
                      ? ''
                      : 'Must be 10+ chars, include @, number, and uppercase',
                    confirm_password:
                      val === form.confirm_password
                        ? ''
                        : 'Passwords do not match',
                  }));
                }}
              />

              <FormInput
                placeholder="Confirm Password"
                required
                secureTextEntry
                value={form.confirm_password}
                error={errors.confirm_password}
                onChangeText={val => {
                  setForm({ ...form, confirm_password: val });
                  setErrors(prev => ({
                    ...prev,
                    confirm_password:
                      val === form.password ? '' : 'Passwords do not match',
                  }));
                }}
              />
            </View>

            {/* Terms of Service */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={toggleTOS}
                style={styles.checkboxButton}
              >
                <Icon
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: form.tos_accept }}
                  name={
                    form.tos_accept ? 'check-box' : 'check-box-outline-blank'
                  }
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                I read and accept the{' '}
                <Text style={styles.link}>Terms of Service</Text>
              </Text>
            </View>

            {/* Privacy Policy */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={togglePrivacy}
                style={styles.checkboxButton}
              >
                <Icon
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: form.privacy_policy_accept }} // use the state value controlling checked/unchecked
                  name={
                    form.privacy_policy_accept
                      ? 'check-box'
                      : 'check-box-outline-blank'
                  }
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                I read and accept the{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>

            <View style={styles.buttonWrapper}>
              <CommonButton
                title="Sign Up"
                onPress={handleSubmit}
                loading={loading}
              />
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text
                  onPress={onSignInPress}
                  style={[styles.link, styles.underline]}
                >
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 20,
    color: '#555',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxButton: {
    marginEnd: 10,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  link: {
    color: COLORS.primary,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: COLORS.text,
  },
});
