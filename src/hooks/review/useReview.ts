import React, { useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apis } from '../../apis';
import { useForm } from 'react-hook-form';
import { queryKeys } from '../../shared/constant/queryKeys';

export function useReview<T>(defaultValue: T) {
  const queryClient = useQueryClient();
  const { register, getValues, resetField } = useForm({});
  const [imgSrc, setImgSrc] = useState<string>('');
  const [file, setFile] = useState<File[]>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(Array.from(e.target.files));
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  }, []);

  const imgBtn = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const handledeleteImage = useCallback(() => {
    setImgSrc('');
    setFile([]);
  }, []);

  const handleReviewUpload = async (postId: number) => {
    if (getValues().content.length < 2) {
      return alert('댓글 최소 2글자 이상 입력해주세요.');
    } else {
      const value = await apis.reviewUpload(postId, { content: getValues().content });
      const formData = new FormData();
      if (file !== undefined && file.length >= 1) {
        formData.append('files', file[0]);
        await apis.reviewImage(value, formData);
        setFile([]);
      }
      queryClient.invalidateQueries([queryKeys.REVIEWLIST]);
      setImgSrc('');
      resetField('content');
    }
  };

  return {
    imgBtn,
    inputRef,
    onUploadImage,
    handledeleteImage,
    imgSrc,
    handleReviewUpload,
    register,
  };
}
