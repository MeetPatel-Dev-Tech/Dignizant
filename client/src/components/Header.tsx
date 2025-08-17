import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { StorageKeys } from '../utils/storage';
import { setToken } from '../redux/authSlice';

interface HeaderProps {
  title: string;
  back?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, back = false }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {back ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.leftIcon}
          >
            <Icon name="arrow-back" size={24} color={COLORS.background} />
          </TouchableOpacity>
        ) : (
          <View style={styles.leftIcon} />
        )}

        <Text style={styles.title}>{title}</Text>

        {/* Logout button on right */}
        <TouchableOpacity onPress={handleLogout} style={styles.leftIcon}>
          <Icon name="log-out-outline" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: COLORS.background,
    fontSize: 20,
    fontWeight: 'bold',
  },
  leftIcon: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
