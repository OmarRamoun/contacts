import React from 'react';

import {useField} from '@lib';
import {ensureArray} from '@utils/general';

import type {InputSelectProps} from './input-select';
import {InputSelect} from './input-select';
import type {SelectValue} from './input-shared';

const ALL_ID = -1;
const ALL_LABEL = 'All';

const InputSelectAll = ({
  formikId,
  options,
  ...inputSelectProps
}: Omit<InputSelectProps, 'value' | 'onValueChange'> & {formikId: string}) => {
  const [field, _, helpers] = useField<(string | number)[]>(formikId);

  const onValueChange = async (value: SelectValue) => {
    const newValue = value ? ensureArray(value) : [];

    if (newValue.includes(ALL_ID) && field.value.every((el) => el !== ALL_ID)) {
      await helpers.setValue([ALL_ID]);
    } else if (newValue.includes(ALL_ID)) {
      await helpers.setValue(newValue.filter((el) => el !== ALL_ID));
    } else if (newValue.length === options.length || newValue.length === 0) {
      await helpers.setValue([ALL_ID]);
    } else {
      await helpers.setValue(newValue);
    }
  };

  return (
    <InputSelect
      {...inputSelectProps}
      value={field.value}
      options={[{label: ALL_LABEL, value: ALL_ID}, ...options]}
      onValueChange={onValueChange}
    />
  );
};

export {InputSelectAll};
