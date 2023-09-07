import React from 'react';

import {Flex, Typography} from '@components';

function App(): JSX.Element {
  return (
    <Flex bg="green">
      <Typography color="blue">should this work now?</Typography>
      <Typography>this will isa work?</Typography>
    </Flex>
  );
}

export {App};
