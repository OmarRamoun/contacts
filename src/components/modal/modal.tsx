import type React from 'react';
import {useCallback, useEffect, useRef} from 'react';
import {Platform} from 'react-native';

import type {ModalObjects} from './modal-context';
import {useModalContext} from './modal-context';

export interface ModalProps extends Omit<ModalObjects, 'el' | 'id'> {
  children: React.ReactElement;
  show: boolean;
}

const Modal = ({
  children,
  show,
  backdropCanClose = true,
  centerVertically,
  onClose,
  customBackgroundColor,
  showsVerticalScrollIndicator = true,
}: ModalProps) => {
  const modalId = useRef(-1);
  const {showElement, closeElement, allocateId, closeAll, setCenterVertically} = useModalContext();

  useEffect(() => {
    setCenterVertically(!!centerVertically);
  }, []);

  const handleKeyPress = useCallback(
    (e: any) => {
      if (e.key === 'Escape') closeAll();
    },
    [closeAll],
  );

  useEffect(() => {
    if (Platform.OS === 'web') document.addEventListener('keyup', handleKeyPress);

    return () => {
      if (Platform.OS === 'web') document.removeEventListener('keyup', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (show) {
      if (modalId.current < 0) modalId.current = allocateId();

      showElement({
        id: modalId.current,
        el: children,
        backdropCanClose,
        onClose,
        customBackgroundColor,
        centerVertically,
        showsVerticalScrollIndicator,
      });
    } else if (modalId.current >= 0) {
      closeElement(modalId.current);
      modalId.current = -1;
    }
  }, [children, show, modalId]);

  useEffect(() => () => closeElement(modalId.current), []);

  return null;
};

export {Modal};
