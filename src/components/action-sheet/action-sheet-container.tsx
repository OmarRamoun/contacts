import React from 'react';

import {ActionSheetContextProvider} from './action-sheet-context';
import {ActionSheetDisplay} from './action-sheet-display';

interface ActionSheetContainerProps {
  children: React.ReactNode;
}

const ActionSheetContainer = ({children}: ActionSheetContainerProps) => (
  <ActionSheetContextProvider>
    {children}
    <ActionSheetDisplay />
  </ActionSheetContextProvider>
);

export {ActionSheetContainer};
