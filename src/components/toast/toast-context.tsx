import React, {createContext, useContext, useState, useCallback} from 'react';

import type {DefaultTheme} from 'styled-components/native';

import {utils} from '@utils/general';

export interface ToastObject {
  message: string;
  subMessage?: string;
  duration?: number;
  backgroundColor?: keyof DefaultTheme['colors'];
}

interface InternalToastObject extends ToastObject {
  id: number;
}

interface ToastContextProps {
  messages: InternalToastObject[];
  showToast: (options: ToastObject) => number;
  showOneToast: (options: ToastObject) => number;
  showErrorToast: (options: ToastObject) => number;
  removeToast: (id: number) => void;
}

interface ToastContextProviderProps {
  children: React.ReactNode;
}

const initialState = {
  messages: [],
};

const ToastContext = createContext<ToastContextProps>({
  ...initialState,
  showToast: utils.noop(-1),
  showOneToast: utils.noop(-1),
  showErrorToast: utils.noop(-1),
  removeToast: utils.noop,
});

const ToastContextProvider = ({children}: ToastContextProviderProps) => {
  const [toastId, setToastId] = useState<number>(0);
  const [messages, setMessages] = useState<InternalToastObject[]>([]);

  const showToast = useCallback(
    (options: ToastObject) => {
      const currId = toastId;
      setMessages([
        ...messages,
        {
          ...options,
          id: toastId,
        },
      ]);

      setToastId(currId + 1);

      return currId;
    },
    [messages, setMessages, toastId, setToastId],
  );

  const showOneToast = useCallback(
    (options: ToastObject) => {
      const currId = toastId;
      setMessages([
        {
          ...options,
          id: toastId,
        },
      ]);

      setToastId(currId + 1);
      return currId;
    },
    [setMessages, toastId, setToastId],
  );

  const showErrorToast = useCallback(
    (options: ToastObject) => showToast({...options, backgroundColor: 'red'}),
    [showToast],
  );

  const removeToast = useCallback(
    (id: number) => {
      const currMessages = messages.slice();
      currMessages.splice(
        messages.findIndex((message) => message.id === id),
        1,
      );

      setMessages(currMessages);
    },
    [messages, setMessages],
  );

  return (
    <ToastContext.Provider value={{messages, showToast, showOneToast, showErrorToast, removeToast}}>
      {children}
    </ToastContext.Provider>
  );
};

const useToastContext = () => useContext(ToastContext);

export {ToastContextProvider, ToastContext, useToastContext};
