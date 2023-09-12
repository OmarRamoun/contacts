import React, {useState, useCallback, useEffect} from 'react';

import type {FormikContextType} from '@lib';

import {Button} from '../button/button';
import {Typography} from '../typography';

import {FormModal} from './form-modal';

interface FormErrorModalProps {
  title: string;
  error?: string;
  onDismiss?: () => void;
  ctx?: FormikContextType<any>;
}

const FormErrorModal = ({title, error, onDismiss, ctx}: FormErrorModalProps) => {
  const [showError, setShowError] = useState<boolean>(false);

  const onDismissError = useCallback(() => {
    setShowError(false);
    if (ctx) ctx.setErrors({});
    if (onDismiss) onDismiss();
  }, [onDismiss, ctx]);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  return (
    <FormModal
      show={showError}
      title={title}
      rightStaticIcon="alert"
      footer={
        <Button depth={4} onPress={onDismissError}>
          OK
        </Button>
      }>
      <Typography color="darkBlue">{error}</Typography>
    </FormModal>
  );
};

export {FormErrorModal};
