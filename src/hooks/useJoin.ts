import React from 'react';
import { apis } from '../apis';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addressAction } from '../redux/features/addressSlice';
import { subjectAction } from '../redux/features/subjectSlice';
import { calendarAction } from '../redux/features/calendarSlice';
import { queryKeys } from '../shared/constant/queryKeys';

export function useJoin<T>(defaultValue: T) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const handleStatusChange = async (postId: number) => {
    try {
      await apis.updateMatchStatus(postId);
      queryClient.invalidateQueries([queryKeys.POSTLIST]);
      queryClient.invalidateQueries([queryKeys.ACCEPTLIST]);
    } catch (err) {
      if (err && err instanceof AxiosError) {
        alert(err.response?.data);
      }
    }
  };

  const handleScoreChange = async (requestId: string, value: string) => {
    await apis.updateTotalStatus(requestId, { status: value });
    queryClient.invalidateQueries([queryKeys.JOINLIST]);
    queryClient.invalidateQueries([queryKeys.ACCEPTLIST]);
  };

  const handleJoinTheGame = async (postId: number) => {
    try {
      if (window.confirm('참가 신청 하시겠습니까?')) {
        await apis.postJoinGame(postId);
        alert('참가 신청이 완료되었습니다.');
        queryClient.invalidateQueries([queryKeys.POSTLIST]);
        queryClient.invalidateQueries([queryKeys.JOINLIST]);
      }
    } catch (err) {
      alert('참가 신청은 중복으로 할 수 없습니다.');
    }
  };
  const handleDeletePost = async (postId: number) => {
    try {
      if (window.confirm('게시글을 삭제하시겠습니까?')) {
        await apis.deletePost(postId);
        alert('게시글이 삭제되었습니다.');
        queryClient.removeQueries([queryKeys.SEARCH]);
        navigate(-1);
      }
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleDispatchData = (
    address: string,
    lat: number,
    lng: number,
    subject: string,
    subjectValue: string,
    matchDeadline: string
  ) => {
    dispatch(addressAction({ address: address, lat: lat, lng: lng }));
    dispatch(subjectAction({ subject: subject, value: subjectValue }));
    dispatch(calendarAction({ date: matchDeadline }));
  };

  return { handleStatusChange, handleScoreChange, handleJoinTheGame, handleDispatchData, handleDeletePost };
}
