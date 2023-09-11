import React, {Children, useEffect, useState} from 'react';

import styled from 'styled-components/native';

import {FormikProvider} from '@lib';
import type {FormikContextType} from '@lib';

import type {BoxProps} from '../box';
import {Box} from '../box';

export interface FormProps extends BoxProps {
  ctx: FormikContextType<any>;
  children?: React.ReactNode;
  verticalSpacing?: number;
}

const StyledForm = styled(Box)`
  flex-direction: column;
`;

const Form = ({children, verticalSpacing = 4, ctx, ...props}: FormProps) => {
  const [childCount, setChildCount] = useState<number>(Children.count(children));

  useEffect(() => {
    setChildCount(Children.count(children));
  }, [children, setChildCount]);

  return (
    <StyledForm {...props}>
      <Box>
        <FormikProvider value={ctx}>
          {Children.map(children, (child, index) => {
            if (!child) return null;
            return <Box mb={index >= childCount - 1 ? 0 : verticalSpacing}>{child}</Box>;
          })}
        </FormikProvider>
      </Box>
    </StyledForm>
  );
};

export {Form};
