import React, { PropsWithChildren, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleClear } from '../redux/features/toggleSlice';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const Modal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const outside = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const handleModal = (e: React.MouseEvent) => {
    console.log(outside.current === e.target);
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
    if (outside.current !== e.target) {
      dispatch(toggleClear());
    }
  };
  return (
    <div ref={outside}>
      <div className='w-[100%] flex flex-col items-center justify-center'>
        <DialogBox className=' w-[100%] h-[448px]'>{children}</DialogBox>
        <Backdrop onClick={handleModal} />
      </div>
    </div>
  );
};

const DialogBox = styled.dialog`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(30, 30, 30, 0.08);
  box-sizing: border-box;
  background-color: #fcfcfc;
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
