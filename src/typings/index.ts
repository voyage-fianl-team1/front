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
  matchStatus: string;
  subject: string;
  content: string;
  owner: number;
}

export interface MatchData {
  postList: [];
}

export interface MatchDataProps {
  postId: number;
  imgurls: string;
  title: string;
  subject: string;
  address: string;
  lat: number;
  lng: number;
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

declare global {
  interface Window {
    kakao: any;
  }
}
