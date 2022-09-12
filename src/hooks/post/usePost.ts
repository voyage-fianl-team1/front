import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { apis } from '../../apis';
import { PostEditDataProps } from '../../typings';
import { toggleCalendarShow, toggleClear, toggleModalShow, toggleSubjectShow } from '../../redux/features/toggleSlice';
import { addressClear } from '../../redux/features/addressSlice';
import { calendarClear } from '../../redux/features/calendarSlice';
import { subjectClear } from '../../redux/features/subjectSlice';
import { useQueryClient } from '@tanstack/react-query';

export function usePost<T>(defaultValue: T) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { register, getValues } = useForm({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File[]>([]);
  const [imgUrl, setImageUrl] = useState([]);
  const address = useSelector((state: RootState) => state.address);
  const subject = useSelector((state: RootState) => state.subject);
  const modalShow = useSelector((state: RootState) => state.toggle.modalShow);
  const calendarShow = useSelector((state: RootState) => state.toggle.calendarShow);
  const subjectShow = useSelector((state: RootState) => state.toggle.subjectShow);
  const date = useSelector((state: RootState) => state.calendar.date);
  const data = location.state as PostEditDataProps;

  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (files.length + images.length > 3) {
      return alert('이미지는 세장까지 업로드 가능합니다.');
    }
    const readAndPreview = (file: File) => {
      const reader = new FileReader();
      reader.onload = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
      setUploadImage(Array.from(files) || []);
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };

  const handleDataUpload = async () => {
    if (getValues().title.length < 1) {
      return alert('제목을 입력해주세요.');
    } else if (subject.subject === '종목을 선택해주세요.') {
      return alert('종목을 선택해주세요.');
    } else if (date === '모집 마감일을 선택해 주세요.') {
      return alert('모집 마감일을 선택해 주세요.');
    } else if (address.address === '주소를 선택해 주세요.' && address.lat === 0 && address.lng === 0) {
      return alert('주소를 선택해주세요.');
    } else if (address.address === undefined) {
      return alert('올바른 주소를 선택해주세요.');
    } else if (getValues().content.length < 1) {
      return alert('내용을 입력해주세요.');
    } else {
      const postData = {
        title: getValues().title,
        matchDeadline: date,
        subject: subject.value,
        content: getValues().content,
        lat: address.lat,
        lng: address.lng,
        address: address.address,
      };
      const value = await apis.postUpload(postData);
      if (uploadImage.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < uploadImage.length; i++) {
          formData.append('files', uploadImage[i]);
        }
        await apis.uploadImage(value, formData);
      }
      queryClient.removeQueries(['postData']);
      navigate('/search');
    }
  };
  const clearAll = () => {
    useEffect(() => {
      dispatch(toggleClear());
      if (data) {
        setImageUrl(data.imgurls);
      }
      return () => {
        dispatch(addressClear());
        dispatch(calendarClear());
        dispatch(subjectClear());
      };
    }, []);
  };

  const handleEditUpload = async () => {
    if (getValues().title.length < 1) {
      return alert('제목을 입력해주세요.');
    } else if (subject.subject === '종목을 선택해주세요.') {
      return alert('종목을 선택해주세요.');
    } else if (date === '모집 마감일을 선택해 주세요.') {
      return alert('모집 마감일을 선택해 주세요.');
    } else if (address.address === '주소를 선택해 주세요.' && address.lat === 0 && address.lng === 0) {
      return alert('주소를 선택해주세요.');
    } else if (address.address === undefined) {
      return alert('올바른 주소를 선택해주세요.');
    } else if (getValues().content.length < 1) {
      return alert('내용을 입력해주세요.');
    } else {
      const postData = {
        title: getValues().title,
        matchDeadline: date,
        subject: subject.value,
        content: getValues().content,
        lat: address.lat,
        lng: address.lng,
        address: address.address,
      };
      await apis.updatePost(data.postId, postData);
      if (uploadImage.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < uploadImage.length; i++) {
          if (uploadImage[i] !== null) {
            formData.append('files', uploadImage[i]);
          }
        }
        await apis.uploadImage(data.postId, formData);
      }
      queryClient.removeQueries(['postData']);
      navigate('/search');
    }
  };

  const handledeletePrevImg = async (id: number) => {
    setImages(images.filter((_, index) => index !== id));
    setUploadImage([...uploadImage.slice(0, id), ...uploadImage.slice(id + 1)]);
  };

  const handledeleteImage = async (id: number) => {
    if (window.confirm('이미지를 삭제하시겠습니까?')) {
      const imgpaths = data.imgpaths[id];
      if (imgpaths !== undefined) {
        await apis.deleteImage(imgpaths['path']);
      }
      if (data.imgurls.length > 0) {
        setImageUrl(imgUrl.filter((_, index) => index !== id));
      }
    }
  };

  const handleImgBtn = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModalShow());
  }, [modalShow]);

  const handleToggleCalendar = useCallback(() => {
    dispatch(toggleCalendarShow());
  }, [calendarShow]);

  const handleToggleSubject = useCallback(() => {
    dispatch(toggleSubjectShow());
  }, [subjectShow]);

  return {
    handleImgBtn,
    handleToggleSubject,
    handleToggleCalendar,
    handleToggleModal,
    inputRef,
    handledeleteImage,
    handledeletePrevImg,
    onSaveFiles,
    images,
    clearAll,
    uploadImage,
    imgUrl,
    data,
    register,
    handleEditUpload,
    handleDataUpload,
    address,
    subject,
    modalShow,
    subjectShow,
    calendarShow,
    date,
  };
}
