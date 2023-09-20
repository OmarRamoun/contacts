import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

/* import {getItem, setItem} from '@utils/storage'; */

import type {AppConfigs} from '@types';

const initialValue: AppConfigs = {
  safeMode: false,
};

/* const contactsData = getItem('contacts'); */
/* const storage: ContactItem[] = contactsData ? JSON.parse(contactsData) : null; */
/* const setStorage = (value: ContactItem[]) => setItem('contacts', JSON.stringify(value)); */

const contactsSlice = createSlice({
  name: 'AppConfigs',
  initialState: {
    value: initialValue,
  },
  reducers: {
    updateConfigs: (state, action: PayloadAction<AppConfigs>) => {
      // eslint-disable-next-line
      state.value = {...state.value, ...action.payload};
    },
  },
});

const {updateConfigs} = contactsSlice.actions;
export {contactsSlice, updateConfigs};

export default contactsSlice.reducer;
