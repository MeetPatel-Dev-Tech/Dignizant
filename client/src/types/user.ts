export interface UserData {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface FetchUsersResponse {
  success: boolean;
  message: string;
  data: UserData[];
  token: string;
}
