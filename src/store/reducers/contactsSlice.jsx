import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filterarr: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.data.push(action.payload);
      console.log(state.data);
    },
    updatecontacts: (state, action) => {
      const index = state.data.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,  // mreging the existing and updated contact
        };
      }
    },
    searchingContact: (state, action) => {
      state.searching = action.payload;
    },

    searchfilter : (state,action) => {
      const name = action.payload.toLowerCase();
     state.filterarr =  state.data.filter((item) => item.name.toLowerCase().includes(name));
    },
    deleteContact: (state, action) => {
      state.data = state.data.filter((contact) => contact.id!== action.payload);
      state.filterarr = state.filterarr.filter((contact) => contact.id!== action.payload);
    }
  },
});

export const { addContact, updatecontacts,searchingContact,searchfilter,deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
