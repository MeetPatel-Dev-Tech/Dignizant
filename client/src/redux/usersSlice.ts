import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsersApi } from '../services/user.service';
import { UserData } from '../types/user';

interface UsersState {
  users: UserData[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Simulate API call
export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  // const response = await new Promise<User[]>(resolve =>
  //   setTimeout(
  //     () =>
  //       resolve([
  //         {
  //           id: '1',
  //           name: 'Alice',
  //           profilePic: 'https://i.pravatar.cc/150?img=1',
  //         },
  //         {
  //           id: '2',
  //           name: 'Bob',
  //           profilePic: 'https://i.pravatar.cc/150?img=2',
  //         },
  //         {
  //           id: '3',
  //           name: 'Charlie',
  //           profilePic: 'https://i.pravatar.cc/150?img=3',
  //         },
  //         {
  //           id: '4',
  //           name: 'David',
  //           profilePic: 'https://i.pravatar.cc/150?img=4',
  //         },
  //         {
  //           id: '5',
  //           name: 'Eva',
  //           profilePic: 'https://i.pravatar.cc/150?img=5',
  //         },
  //       ]),
  //     1000,
  //   ),
  // );

  const response = await fetchUsersApi();
  console.log('Fetched users:', response);
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export default usersSlice.reducer;
