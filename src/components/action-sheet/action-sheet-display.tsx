import React, {useContext} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import styled from 'styled-components/native';

import {Flex} from '../flex';
import {TransitionContainer} from '../transition/transition-container';
import {FadeTransitionStyle} from '../transition/transition-shared';

import {ActionSheetContext} from './action-sheet-context';

const Backdrop = styled(Flex)<{overrideBackground?: string}>`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.actionSheet};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.overrideBackground ?? props.theme.colors.semiOpaqueWhite};
`;

const ActionSheetContainer = styled(Flex)<{top: number; left: number}>`
  position: absolute;
  z-index: ${(props) => props.theme.zIndex.actionSheet};
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const ActionSheetDisplay = () => {
  const {elements, overrideBackdropColor, closeAll} = useContext(ActionSheetContext);

  return (
    <TransitionContainer
      transitionStyle={FadeTransitionStyle}
      isVisible={elements.length > 0}
      style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
      <TouchableWithoutFeedback onPress={closeAll}>
        <Backdrop overrideBackground={overrideBackdropColor} />
      </TouchableWithoutFeedback>

      {elements.map(({el, id, position}) => (
        <ActionSheetContainer key={id} top={position.y} left={position.x}>
          {el}
        </ActionSheetContainer>
      ))}
    </TransitionContainer>
  );
};

export {ActionSheetDisplay};
