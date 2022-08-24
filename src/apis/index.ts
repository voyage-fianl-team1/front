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
  updateUser: (nickname: string) => {
    return instance.put('/api/users', {
      nickname,
    });
  },
  updateUserProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return instance.put('/api/images/users', formData);
  },
  getUser: () => instance.get('/api/users'),
  getChatRooms: () => instance.get(`/api/users/rooms?lastActive=${Date.now()}`).then((res) => res.data),
  getChatHistory: (roomId: number | string, firstChat?: number | undefined) => {
    if (!firstChat) {
      return instance.get(`/api/rooms/${roomId}/chats?limit=20`).then((res) => res.data);
    }
    return instance.get(`/api/rooms/${roomId}/chats?lastChat=${firstChat}&limit=20`).then((res) => res.data);
  },
  getMatchItem: () => instance.get('/api/posts?page=0&size=10&subject=ALL&sort=default'),
  getSearchList: (pageParam: number, keyword: string) =>
    instance.get(`/api/posts/search?page=${pageParam}&size=20&search=${keyword}`),
  setLastActive: (roomId: number) => instance.put(`/api/room/${roomId}/lastActive`),
};
