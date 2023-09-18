import React, {createContext, useContext, useState, useCallback} from 'react';

import type {DefaultTheme} from 'styled-components';

import {utils} from '@utils/general';

export interface ModalObjects {
  id: number;
  el: React.ReactElement;
  onClose?: () => void;
  customBackgroundColor?: keyof DefaultTheme['colors'];
  backdropCanClose?: boolean;
  centerVertically?: boolean;
  showsVerticalScrollIndicator?: boolean;
}

interface ModalContextProps {
  elements: ModalObjects[];
  showElement: (options: ModalObjects) => number;
  closeElement: (id: number) => void;
  closeAll: () => void;
  allocateId: () => number;
  setCenterVertically: (val: boolean) => void;
  centerVertically: boolean;
}

interface ModalContextProviderProps {
  children: React.ReactNode;
}

const initialState = {
  elements: [],
};

const ModalContext = createContext<ModalContextProps>({
  ...initialState,
  showElement: utils.noop(-1),
  closeElement: utils.noop,
  closeAll: utils.noop,
  allocateId: utils.noop(-1),
  setCenterVertically: utils.noop,
  centerVertically: false,
});

const ModalContextProvider = ({children}: ModalContextProviderProps) => {
  const [id, setId] = useState<number>(0);
  const [centerVertically, setCenterVertically] = useState(false);
  const [elements, setElements] = useState<ModalObjects[]>([]);

  const showElement = useCallback(
    ({el, backdropCanClose = true, id: modalId, ...props}: ModalObjects) => {
      const els = elements.slice();

      const elIdx = els.findIndex((obj) => obj.id === modalId);

      // Checks to see if the modalId does in fact exist
      if (elIdx >= 0) {
        els[elIdx] = {
          ...els[elIdx],
          el,
          backdropCanClose,
          ...props,
        };

        setElements(els);
        return els[elIdx].id;
      }

      els.push({
        el,
        backdropCanClose,
        id: modalId,
        ...props,
      });

      setElements(els);
      return modalId;
    },
    [elements],
  );

  const closeElement = useCallback(
    (elementId: number) => {
      const elIdx = elements.findIndex((el) => el.id === elementId);

      if (elIdx >= 0) {
        const els = elements.slice();
        const deletingEl = els[elIdx];
        els.splice(elIdx, 1);

        if (deletingEl.onClose) deletingEl.onClose();

        setElements(els);
      }
    },
    [elements],
  );

  const closeAll = useCallback(() => {
    const cantCloseEl = elements.some((el) => !el.backdropCanClose);

    if (!cantCloseEl) {
      elements.forEach(({onClose}) => (onClose ? onClose() : null));
      setElements([]);
    }
  }, [elements]);

  const allocateId = useCallback(() => {
    const currId = id;
    setId((prevId) => prevId + 1);
    return currId;
  }, [id, setId]);

  return (
    <ModalContext.Provider
      value={{
        elements,
        showElement,
        closeElement,
        closeAll,
        allocateId,
        centerVertically,
        setCenterVertically: (val) => setCenterVertically(val),
      }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);

export {ModalContextProvider, ModalContext, useModalContext};
