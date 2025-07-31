import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './src/redux/store';
import { setToken } from './src/redux/authSlice';
import { getItem, StorageKeys } from './src/utils/storage';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

const RootApp = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const storedToken = await getItem(StorageKeys.TOKEN);
      if (storedToken) {
        dispatch(setToken(storedToken));
      }
      setLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}
