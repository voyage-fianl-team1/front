export interface UserLogin {
  email: string;
  password: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export interface PostDataProps {
  title: string;
  imageUrlList: [];
  matchDeadline: string;
  peopleDeadline: string;
  subject: string;
  content: string;
  owner: number;
}