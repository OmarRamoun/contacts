import React from 'react';
import {Platform} from 'react-native';

import styled from 'styled-components/native';

import {Flex} from '../flex';

import {Toast} from './toast';
import {useToastContext} from './toast-context';

const OuterWindow = styled(Flex)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${(props) => props.theme.zIndex.toast};
`;

const ToastContainer = styled(Flex)<{top?: number}>`
  position: absolute;
  z-index: 2;
  top: ${(props) => props.top}px;
  width: 100%;
  padding-left: ${(props) => props.theme.sizes.modalPaddingX}px;
  padding-right: ${(props) => props.theme.sizes.modalPaddingX}px;
`;

const OuterWindowAndroid = styled(Flex)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  elevation: ${(props) => props.theme.zIndex.toast};
  z-index: ${(props) => props.theme.zIndex.toast};
`;

const ToastContainerAndroid = styled(Flex)<{top?: number}>`
  position: absolute;
  elevation: 2;
  top: ${(props) => props.top}px;
  width: 100%;
  padding-left: ${(props) => props.theme.sizes.modalPaddingX}px;
  padding-right: ${(props) => props.theme.sizes.modalPaddingX}px;
`;

const ToastDisplay = ({insetTop = 0}: {insetTop?: number}) => {
  const {messages, removeToast} = useToastContext();

  return (
    <>
      {Platform.OS === 'android' ? (
        <OuterWindowAndroid>
          <ToastContainerAndroid top={insetTop}>
            {messages.map(({id, ...toast}) => (
              <Toast key={id} onClose={() => removeToast(id)} {...toast} />
            ))}
          </ToastContainerAndroid>
        </OuterWindowAndroid>
      ) : (
        <OuterWindow>
          <ToastContainer top={insetTop}>
            {messages.map(({id, ...toast}) => (
              <Toast key={id} onClose={() => removeToast(id)} {...toast} />
            ))}
          </ToastContainer>
        </OuterWindow>
      )}
    </>
  );
};

export {ToastDisplay};
