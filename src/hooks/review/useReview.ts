import React, { useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apis } from '../../apis';
import { useForm } from 'react-hook-form';
import { queryKeys } from '../../shared/constant/queryKeys';
import Compressor from 'compressorjs';

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

  const handleUpload = async (value: number, formData: FormData) => {
    await apis.reviewImage(value, formData);
    queryClient.invalidateQueries([queryKeys.REVIEWLIST]);
  };

  const handleReviewUpload = async (postId: number) => {
    if (getValues().content.length < 2) {
      return alert('댓글 최소 2글자 이상 입력해주세요.');
    } else {
      const value = await apis.reviewUpload(postId, { content: getValues().content });
      if (file !== undefined && file.length >= 1) {
        const formData = new FormData();
        new Compressor(file[0], {
          quality: 0.6,
          success(result) {
            console.log(result);
            formData.append('files', result);
            handleUpload(value, formData);
          },
        });
      }
    }
    queryClient.invalidateQueries([queryKeys.REVIEWLIST]);
    setFile([]);
    setImgSrc('');
    resetField('content');
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
