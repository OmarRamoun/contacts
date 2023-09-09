import React from 'react';

import {ButtonContent} from './button-content';
import {ButtonInteraction} from './button-interaction';
import type {ButtonProps} from './button-shared';

//  TODO: shift the  button icon to be  inline  with  text
const Button = ({children, onPress, disabled, type, to, ...props}: ButtonProps) => (
  <>
    <ButtonInteraction to={to} onPress={onPress} disabled={disabled}>
      {({mouseProps, ...interactionProps}) => (
        <ButtonContent type={type} {...mouseProps} {...interactionProps} {...props}>
          {children}
        </ButtonContent>
      )}
    </ButtonInteraction>
  </>
);

export {Button};
