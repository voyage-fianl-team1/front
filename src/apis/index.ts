import axios from 'axios';
import { UserInfo, UserLogin, UserSignUp } from '../typings';

const SERVER_URL = 'http://52.78.157.63';

export const instance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

instance.interceptors.request.use((req) => {
  if (req.headers) {
    req.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`;
    req.headers.refreshToken = `${window.localStorage.getItem('refreshToken')}`;
  }
  return req;
});

export const apis = {
  signIn: (data: UserLogin) => instance.post('/api/signin', data),
  signUp: (data: UserSignUp) => instance.post('/api/signup', data),
  updateUser: (data: UserInfo) => {
    const formData = new FormData();
    const key: UserInfo = {
      deleteImage: data.deleteImage || '-1',
      nickname: data.nickname,
    };
    formData.append('key', new Blob([JSON.stringify(key)], { type: 'application/json' }));
    data.file && formData.append('file', data.file);
    return instance.put('/api/users', formData);
  },
};
