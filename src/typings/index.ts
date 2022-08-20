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
  matchDeadline: string;
  peopleDeadline: string;
  subject: string;
  content: string;
  owner: number;
}

export interface PostEditDataProps extends PostDataProps {
  postId: number;
}

export type ImageType = {
  [key: string]: string;
};
