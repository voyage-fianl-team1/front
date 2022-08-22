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

declare global {
  interface Window {
    kakao: any;
  }
}