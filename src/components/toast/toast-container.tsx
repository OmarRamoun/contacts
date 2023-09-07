import React from 'react';

import {ToastContextProvider} from './toast-context';
import {ToastDisplay} from './toast-display';

interface ToastContainerProps {
  children: React.ReactNode;
  insetTop?: number;
}

const ToastContainer = ({children, insetTop}: ToastContainerProps) => (
  <ToastContextProvider>
    <ToastDisplay insetTop={insetTop} />
    {children}
  </ToastContextProvider>
);

export {ToastContainer};
