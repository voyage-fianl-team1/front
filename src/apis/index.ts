import axios from 'axios';
import { UserLogin, UserSignUp } from '../typings';

const SERVER_URL = 'http://52.78.157.63';

const instance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL,
});

instance.interceptors.request.use((req) => {
  if (req.headers) {
    req.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
  }
  return req;
});

export default instance;

export const apis = {
  signIn: (data: UserLogin) => instance.post('/api/signin', data),
  signUp: (data: UserSignUp) => instance.post('/api/signup', data),
};
