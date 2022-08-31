export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUp extends UserLogin {
  nickname: string;
  passwordCheck?: string;
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
  profileImgUrl: string;
  nickname: string;
  player: number;
  subjectValue: string;
}

export interface MatchData {
  postList: [];
}

export interface MatchDataProps {
  postId: number;
  imgUrl: string;
  title: string;
  subject: string;
  address: string;
  lat: number;
  lng: number;
}

export interface PostEditDataProps extends PostDataProps {
  postId: number;
}

export interface JoinData {
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

export interface RecentMatch {
  title: string;
  subject: string;
  content?: string;
  address?: string;
  postId: number;
}

export interface UserRequest {
  id: number;
  requestStatus: string;
  subject: string;
  title: string;
  imageUrl: string[];
  createdAt: string;
}

export interface UserPostType {
  id: number;
  subject: string;
  title: string;
  imageUrl: string[];
  createdAt: string;
}

export interface MatchHistoryType {
  matchDeadline: string; // 경기한 날
  subject: string;
  status: string;
  imgUrl: string;
  postId: 5;
  title: string;
}

export interface TotalStatus {
  [key: string]: string;
}

export interface PostUpload {
  title: string;
  matchDeadline: string;
  subject: string;
  content: string;
  lat: number;
  lng: number;
  address?: string;
}

export interface Notification {
  content: string;
  createdAt: string;
  id: number;
  isread: boolean;
  postId: number;
}

export interface ReviewData {
  content: string;
}

export interface JoinDataProps {
  data: {
    owner: number;
    postId: number;
    player: number;
    matchStatus: string;
    profileUrl: string;
    nickName: string;
    matchDeadline: string;
    title: string;
    subject: string;
    content?: string;
    address?: string;
    lat: number;
    lng: number;
    imgurls: [];
    imgpaths: [];
    subjectValue: string;
  };
}
