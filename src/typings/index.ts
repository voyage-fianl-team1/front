export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUp extends UserLogin {
  nickname: string;
}

export interface UserInfo {
  nickname?: string;
  deleteImage?: string;
  file?: File;
}
