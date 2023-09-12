import React from 'react';

import {useField} from '@lib';

interface InputFormikProps {
  name: string;
  displayErrorMessage?: boolean;
  children: React.ReactElement;
}

const InputFormik = ({name, displayErrorMessage, children}: InputFormikProps) => {
  const [field, meta, helpers] = useField(name);

  return React.cloneElement(children, {
    field,
    meta,
    helpers,
    error: !!meta.error,
    errorMessage: displayErrorMessage ? meta.error : null,
    value: field.value,
    initialValue: meta.initialValue,
  });
};

export {InputFormik};
