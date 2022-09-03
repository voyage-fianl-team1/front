import React, { PropsWithChildren, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toggleClear } from '../redux/features/toggleSlice';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const Modal = ({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) => {
  const outside = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const handleModal = (e: React.MouseEvent) => {
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
        <dialog
          className='w-[100%] h-[448px] flex flex-col items-center rounded-[10px] box-border bg-[#FCFCFC]
        z-[10000] shadow-[0_4px_20px_rgba(30,30,30,0.08)] '
        >
          {children}
        </dialog>
        <div className='w-[100vw] h-[100vh] fixed top-0 z-[9999] bg-[rgba(0,0,0,0.2)]' onClick={handleModal} />
      </div>
    </div>
  );
};

export default Modal;
