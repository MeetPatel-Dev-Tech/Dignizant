import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/auth';
import COLORS from '../../constants/colors';
import { RootState } from '../../redux/store';
import { setSearchQuery } from '../../redux/searchSlice';
import Header from '../../components/Header';

type DashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

interface User {
  id: string;
  name: string;
  profilePic: string;
  lastMessage: string;
}

const mockedUsers: User[] = [
  {
    id: '1',
    name: 'Alice',
    profilePic: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hello!',
  },
  {
    id: '2',
    name: 'Bob',
    profilePic: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Hey there!',
  },
  {
    id: '3',
    name: 'Charlie',
    profilePic: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Good morning',
  },
];

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardNavigationProp>();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const filteredUsers = mockedUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate('ChatScreen')}
    >
      <Image source={{ uri: item.profilePic }} style={styles.avatar} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Chats" back={false} />

      <TextInput
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={text => dispatch(setSearchQuery(text))}
        style={styles.searchBar}
        placeholderTextColor={COLORS.textSecondary}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={renderUser}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AllUsers')}
      >
        <Text style={{ color: '#fff', fontSize: 24 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  searchBar: {
    margin: 10,
    padding: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 8,
  },
  userItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  userName: { fontWeight: 'bold', fontSize: 16, color: COLORS.textPrimary },
  lastMessage: { color: COLORS.textSecondary },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default DashboardScreen;
