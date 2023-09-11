import React from 'react';

import {ModalContextProvider} from './modal-context';
import type {ModalDisplayProps} from './modal-display';
import {ModalDisplay} from './modal-display';

interface ModalContainerProps {
  children: React.ReactNode;
  displayProps?: ModalDisplayProps;
}

const ModalContainer = ({children, displayProps = {}}: ModalContainerProps) => (
  <ModalContextProvider>
    {children}
    <ModalDisplay {...displayProps} />
  </ModalContextProvider>
);

export {ModalContainer};
