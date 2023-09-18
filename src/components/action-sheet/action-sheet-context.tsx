import React, {createContext, useState, useMemo} from 'react';

import {utils} from '@utils/general';

interface ActionSheetObjects {
  id: number;
  el: React.ReactElement;
  position: {x: number; y: number};
  overrideBackdropColor?: string;
  onClose?: () => void;
}

interface ActionSheetContextProps {
  elements: ActionSheetObjects[];
  overrideBackdropColor: string | undefined;
  showElement: (options: ActionSheetObjects) => number;
  closeElement: (id: number) => void;
  closeAll: () => void;
  allocateId: () => number;
  isVisible: (id: number) => boolean;
}

interface ActionSheetContextProviderProps {
  children: React.ReactNode;
}

const initialState = {
  elements: [],
  overrideBackdropColor: undefined,
};

const ActionSheetContext = createContext<ActionSheetContextProps>({
  ...initialState,
  showElement: () => utils.noop(-1),
  closeElement: utils.noop,
  closeAll: utils.noop,
  allocateId: () => utils.noop(-1),
  isVisible: utils.noop,
});

const ActionSheetContextProvider = ({children}: ActionSheetContextProviderProps) => {
  const [id, setId] = useState<number>(1);
  const [overrideBackdropColor, setBackdrop] = useState<string | undefined>(undefined);
  const [elements, setElements] = useState<ActionSheetObjects[]>([]);

  const showElement = ({
    el,
    id: actionSheetId,
    overrideBackdropColor: elementBackdrop,
    position,
    onClose,
  }: ActionSheetObjects) => {
    setBackdrop(elementBackdrop);
    const els = elements.slice();

    // Check to see if its already open and updating some properties
    if (typeof actionSheetId !== 'undefined' && actionSheetId >= 0) {
      const elIdx = els.findIndex((obj) => obj.id === actionSheetId);

      // Checks to see if the actionSheetId does in fact exist
      if (elIdx >= 0) {
        els[elIdx] = {...els[elIdx], el, position, onClose};
        setElements(els);
        return els[elIdx].id;
      }
    }

    els.push({el, id: actionSheetId, position, onClose});
    setElements(els);
    return actionSheetId;
  };

  const closeElement = (elementId: number) => {
    const elIdx = elements.findIndex((el) => el.id === elementId);

    if (elIdx >= 0) {
      const els = elements.slice();
      els.splice(elIdx, 1);
      setElements(els);
    }

    elements[elIdx]?.onClose?.();
  };

  const closeAll = () => {
    elements.forEach((el) => el.onClose?.());
    setElements([]);
  };

  const allocateId = () => {
    const currId = id;
    setId(currId + 1);
    return currId;
  };

  const isVisible = (elementId: number) => elements.findIndex((el) => el.id === elementId) >= 0;

  const value: ActionSheetContextProps = useMemo(
    () => ({
      elements,
      overrideBackdropColor,
      showElement,
      closeElement,
      closeAll,
      allocateId,
      isVisible,
    }),
    [elements, overrideBackdropColor],
  );

  return <ActionSheetContext.Provider value={value}>{children}</ActionSheetContext.Provider>;
};

export {ActionSheetContextProvider, ActionSheetContext};
