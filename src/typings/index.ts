export interface UserLogin {
  email: string;
  password: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}
