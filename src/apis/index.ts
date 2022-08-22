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

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data == 'ExpiredDate') {
      const result = await instance.put(
        '/api/refresh',
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
            refreshToken: `${window.localStorage.getItem('refreshToken')}`,
          },
        }
      );
      window.localStorage.setItem('accessToken', result.data.accessToken);
      window.localStorage.setItem('refreshToken', result.data.refreshToken);

      originalRequest.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const apis = {
  signIn: (data: UserLogin) => instance.post('/api/signin', data),
  signUp: (data: UserSignUp) => instance.post('/api/signup', data),
  updateUser: (data: UserInfo) => {
    return instance.put('/api/users', {
      nickname: data.nickname,
    });
  },
};
