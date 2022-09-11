import React, { PropsWithChildren, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toggleClear } from '../../redux/features/toggleSlice';

export interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export function useModal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
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

  return { outside, handleModal, children, onClickToggleModal };
}
