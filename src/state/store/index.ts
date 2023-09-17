import {configureStore} from '@reduxjs/toolkit';

import contactsReducer from '../slices/contacts';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {RootState, AppDispatch};
export {store};
