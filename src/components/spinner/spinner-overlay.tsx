import styled from 'styled-components/native';

import {Flex} from '../flex';
import {Typography} from '../typography';

import {Spinner} from './spinner';

const LoadingOverlayContainer = styled(Flex)`
  height: auto;
  width: auto;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
`;

const LoadingOverlay = ({loadingText, isForPDF}: {loadingText?: string; isForPDF?: boolean}) => (
  <LoadingOverlayContainer>
    <Spinner size="lg" color="blue" isForPDF={isForPDF} />
    {loadingText && (
      <Flex>
        <Typography style={{marginTop: 5}}>{loadingText}</Typography>
      </Flex>
    )}
  </LoadingOverlayContainer>
);

export {LoadingOverlay};
