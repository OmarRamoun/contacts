import React, {useMemo} from 'react';
import {Platform} from 'react-native';

import styled from 'styled-components/native';

import {Flex} from './flex';
import {Icon} from './icon';
import {TouchableOpacity} from './touchable-opacity';
import {Typography} from './typography';

export interface Stepss {
  label: string;
  onPress?: () => void;
}

interface StepObject {
  object: Stepss;
  index: number;
}

interface Line {
  line: true;
  index: number;
}

interface StepsProps {
  steps: Stepss[];
  active?: string | number;
}

const StepDot = styled(Flex)<{active: boolean; past: boolean}>`
  align-items: center;
  justify-content: center;
  width: ${(props) => props.theme.sizes.stepDotSize}px;
  height: ${(props) => props.theme.sizes.stepDotSize}px;
  border-radius: ${(props) => props.theme.sizes.stepDotSize}px;
  border-width: 2px;
  border-color: ${(props) => (props.active ? props.theme.colors.blue : props.theme.colors.grey)};
  background-color: ${(props) => (props.past ? props.theme.colors.blue : props.theme.colors.white)};
  margin-left: ${(props) => props.theme.space[1]}px;
  margin-right: ${(props) => props.theme.space[1]}px;
`;

const StepTextAndroid = styled(Flex)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  align-items: center;
  width: 100px;
  margin-top: 2px;
  transform: translateX(-33.33px);
`;

const StepTextAndroidS = styled(Flex)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  align-items: center;
  width: 100px;
  margin-top: 2px;
  transform: translateX(-33.33px);
`;

const StepText = styled(Flex)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  align-items: center;
  width: 100px;
  margin-top: 2px;
  transform: translateX(-33.33px);
`;

const StepLine = styled(Flex)<{active: boolean}>`
  flex-grow: 1;
  height: 2px;
  border-radius: 2px;
  background-color: ${(props) => (props.active ? props.theme.colors.blue : props.theme.colors.grey)};
`;

const StepsObservation = ({steps, active}: StepsProps) => {
  const parts = useMemo<Array<StepObject | Line>>(
    () =>
      steps
        .map((s, index) => {
          if (index < steps.length - 1) return [{object: s, index}, {line: true, index} as Line];
          return [{object: s, index}];
        })
        .flat(),
    [steps],
  );

  const activeIndex = useMemo<number>(() => {
    if (typeof active === 'number') return active;
    return steps.findIndex((s) => s.label === active);
  }, [active, steps]);

  return (
    <Flex width="100%" alignItems="center" flexDirection="row" justifyContent="space-between" mb="4">
      {parts.map((part, index) => {
        if ('line' in part) {
          const key = `line-${index}`;
          return <StepLine key={key} active={activeIndex > part.index} />;
        }

        return (
          <Flex alignItems="center" key={`step-${part.object.label}`}>
            <TouchableOpacity onPress={part.object.onPress}>
              <>
                <Flex justifyContent="space-between">
                  <StepDot active={activeIndex >= part.index} past={activeIndex > part.index}>
                    {activeIndex > part.index ? <Icon name="plus" color="white" /> : null}
                  </StepDot>

                  {Platform.OS === 'web' ? (
                    <StepText>
                      <Typography color={activeIndex >= part.index ? 'darkBlue' : 'grey'} numberOfLines={1}>
                        {part.object.label}
                      </Typography>
                    </StepText>
                  ) : (
                    <Flex mt="1">
                      {part.object.label === 'Observation' ? (
                        <StepTextAndroidS>
                          <Typography color={activeIndex >= part.index ? 'darkBlue' : 'grey'} numberOfLines={1}>
                            {part.object.label}
                          </Typography>
                        </StepTextAndroidS>
                      ) : (
                        <StepTextAndroid>
                          <Typography color={activeIndex >= part.index ? 'darkBlue' : 'grey'} numberOfLines={1}>
                            {part.object.label}
                          </Typography>
                        </StepTextAndroid>
                      )}
                    </Flex>
                  )}
                </Flex>
              </>
            </TouchableOpacity>
          </Flex>
        );
      })}
    </Flex>
  );
};

export {StepsObservation};
