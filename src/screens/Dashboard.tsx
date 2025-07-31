import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/auth';
import { setToken } from '../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonButton from '../components/CommonButton';
import { StorageKeys } from '../utils/storage';
import CustomHeader from '../components/CustomHeader';
import { commonStyles } from '../constants/appStyles';

type DashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigation = useNavigation<DashboardNavigationProp>();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(StorageKeys.TOKEN);
            dispatch(setToken(''));
          } catch (error) {
            console.error('Error removing token from AsyncStorage:', error);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={commonStyles.appWrapper}>
      {/* Header stays at top */}
      <View style={styles.headerContainer}>
        <CustomHeader />
      </View>

      {/* Center everything else */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>Dashboard</Text>

        <CommonButton title="Log out" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // Keep header at top, no centering
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // vertical center
    alignItems: 'center', // horizontal center
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
  },
});
