import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OtpVerification from '../screens/OtpVerification';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import type { RootStackParamList } from '../types/auth';
import Success from '../screens/Success';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
}
