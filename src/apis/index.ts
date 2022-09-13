import axios from 'axios';
import { PostUpload, TotalStatus, UserLogin, UserSignUp, ReviewData } from '../typings';

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const SERVER_STOMP_URL = `${SERVER_URL}/ws-stomp`;

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
  getChatRooms: () => instance.get(`/api/users/rooms`).then((res) => res.data),
  getChatHistory: (roomId: number | string, firstChat?: number | undefined) => {
    if (!firstChat) {
      return instance.get(`/api/rooms/${roomId}/chats?limit=20`);
    }
    return instance.get(`/api/rooms/${roomId}/chats?lastChat=${firstChat}&limit=20`);
  },
  getMatchItem: () => instance.get('/api/posts?page=0&size=10&subject=ALL&sort=default'),
  getSearchList: (pageParam: number, keyword: string) =>
    instance.get(`/api/posts/search?page=${pageParam}&size=20&search=${keyword}`),
  setLastActive: (roomId: number) => instance.put(`/api/room/${roomId}/lastActive`),
  getUserRequests: () => instance.get('/api/users/requests'),
  getUserPosts: () => instance.get('/api/users/posts'),
  getUserHistory: (userId: number, subject: string) => instance.get(`/api/users/${userId}/ranking?subject=${subject}`),
  getPostList: (postId: number) => instance.get(`/api/posts/${postId}`),
  getMainPostList: (pageParam: number, subject?: string, sort?: string) =>
    instance.get(`/api/posts?page=${pageParam}&size=20&subject=${subject}&sort=${sort}`),
  getJoinList: (postId: number) => instance.get(`/api/posts/${postId}/request`),
  postJoinGame: (postId: number) => instance.post(`/api/posts/${postId}/request`),
  postExitGame: (postId: number) => instance.delete(`/api/posts/${postId}/request`),
  deletePost: (postId: number) => instance.delete(`/api/posts/${postId}`),
  deleteImage: (imgPath: string) => instance.delete(`/api/images/posts/${imgPath}`),
  updateMatchStatus: (postId: number) => instance.put(`/api/posts/matchstatus/${postId}`),
  updateTotalStatus: (requestId: string, data: TotalStatus) => instance.put(`/api/requests/${requestId}`, data),
  postUpload: (data: PostUpload) =>
    instance.post('/api/posts', data).then((res) => {
      return res.data.postId;
    }),
  updatePost: (postId: number, data: PostUpload) =>
    instance.put(`/api/posts/${postId}`, data).then((res) => {
      return res.data.postId;
    }),
  uploadImage: (postId: number, data: FormData) => instance.post(`/api/images/posts/${postId}`, data),
  getAroundGame: (neLat: string, neLng: string, swLat: string, swLng: string) =>
    instance.get(`/api/posts/gps/point?NElat=${neLat}&NElng=${neLng}&SWlat=${swLat}&SWlng=${swLng}`),
  getNotifications: () => instance.get('/api/users/notifications'),
  postNotificationRead: (notificationId: number) => instance.put(`/api/notifications/${notificationId}`),
  reviewUpload: (postId: number, data: ReviewData) =>
    instance.post(`/api/reviews/${postId}`, data).then((res) => {
      return res.data.reviewId;
    }),
  reviewImage: (reviewId: number, data: FormData) => instance.post(`/api/images/reviews/${reviewId}`, data),
  getReviewList: (postId: number) => instance.get(`/api/reviews/${postId}`),
  getRewrite: () => instance.get('/api/posts/authority'),
  getAcceptList: (postId: number) => instance.get(`/api/posts/${postId}/request/accept`),
  getAllUserRankingList: (subject = 'ALL') => instance.get(`/api/users/rank?page=0&size=5&subject=${subject}`),
  getforGuestPostList: (postId: number) => instance.get(`/api/posts/${postId}/guest`),
  getRoomUserList: (roomId: number) => instance.get(`/api/users/rooms/${roomId}/userList`).then((res) => res.data),
};
