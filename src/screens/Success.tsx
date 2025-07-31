import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/auth';
import COLORS from '../constants/colors';
import CommonButton from '../components/CommonButton';
import { getItem, StorageKeys } from '../utils/storage';
import { setToken } from '../redux/authSlice';
import CustomHeader from '../components/CustomHeader';
import { commonStyles } from '../constants/appStyles';

type SuccessScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Success'
>;

export default function Success() {
  const dispatch = useDispatch();

  const handleContinue = async () => {
    const storedToken = await getItem(StorageKeys.TOKEN);
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  };

  return (
    <SafeAreaView style={commonStyles.appWrapper}>
      {/* Header at top */}
      <View style={styles.headerContainer}>
        <CustomHeader />
      </View>

      {/* Center all content below header */}
      <View style={styles.centerContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.message}>
            Congratulations! You’ve successfully added an authenticator to your
            account.
          </Text>
          <CommonButton title="Done" onPress={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // vertical center
    alignItems: 'center', // horizontal center
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
  },
});
