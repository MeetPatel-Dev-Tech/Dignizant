import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import COLORS from '../../constants/colors';
import { RootStackParamList } from '../../types/auth';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAllUsers } from '../../redux/usersSlice';
import Header from '../../components/Header';
import { UserData } from '../../types/user';

type AllUsersNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AllUsers'
>;

interface Props {
  navigation: AllUsersNavigationProp;
}

const AllUsersScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const renderUser = ({ item }: { item: UserData }) => (
    <TouchableOpacity
      style={styles.userItem}
      //   onPress={() =>
      //     navigation.navigate('Chat', { userId: item.id, userName: item.name })
      //   }
    >
      <Image
        source={{ uri: 'https://www.gravatar.com/avatar/?d=mp&f=y' }}
        style={styles.avatar}
      />
      <Text style={styles.userName}>
        {item.first_name + ' ' + item.last_name}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>All Users</Text> */}
      <Header title="All Users" back={true} />

      <FlatList
        data={users || []}
        keyExtractor={item => item._id}
        renderItem={renderUser}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: COLORS.primary,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  userName: { fontSize: 16, color: COLORS.textPrimary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AllUsersScreen;
