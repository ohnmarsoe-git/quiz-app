export interface User {
  name: string;
  accessToken: string;
  refreshToken: string;
}

export interface SetUser {
  name: string;
  auth: boolean;
  accessToken: string;
  refreshToken: string;
}
