export interface IUser {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
export interface IRefreshToken {
  id: string;
  expiresIn: number;
  userId: string;
}