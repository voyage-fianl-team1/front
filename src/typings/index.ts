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

export interface PostDataProps {
  title: string;
  imgurls: [];
  imgpaths: [];
  address: string;
  lat: number;
  lng: number;
  matchDeadline: string;
  peopleDeadline: string;
  subject: string;
  content: string;
  owner: number;
}

export interface PostEditDataProps extends PostDataProps {
  postId: number;
}

export interface JoinDataProps {
  userList: [];
}

export type ImageType = {
  [key: string]: string;
};

export interface ChatRoom {
  chatId: number | null;
  createdAt: string | null;
  imgUrl: string | null;
  message: string | null;
  nickname: string | null;
  postId: number;
  roomId: number;
  title: string;
  unreadMessageCount: number | null;
}

export interface Chat {
  chatId: number;
  createdAt: Date;
  message: string;
  nickname: string;
  profileImgUrl: string | undefined;
  userId: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}
