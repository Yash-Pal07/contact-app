import { configureStore } from '@reduxjs/toolkit'
import contactsSlice from './reducers/contactsSlice'

const savelocalstorage = (state)=>{
  try{
    localStorage.setItem("ReduxStore",JSON.stringify(state));
  }
  catch(error){
    console.log("could not save datas: " ,error);
  }
};

const loadfromLocalStorage = ()=>{
  try {
   const data =  localStorage.getItem("ReduxStore");
    return JSON.parse(data);
  }
  catch(error){
    console.log("Could not load datas: " ,error);
    return undefined;
  }};

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
  },
  preloadedState: loadfromLocalStorage()
})

store.subscribe(() => {
  savelocalstorage({
    contacts: store.getState().contacts, 
  });
});

//store.subscribe(() =>
// A Redux store method that listens for any state updates.
// It executes the provided callback function (savelocalstorage) whenever an action is dispatched, and the state changes.
// Callback Function (savelocalstorage):

// Inside the subscription, it calls the savelocalstorage function, passing a portion of the Redux state (contacts) to be saved in localStorage.
// Extracting the State Slice:

// store.getState() retrieves the current state of the Redux store.
// store.getState().contacts accesses the "contacts" slice of the state.
// This ensures that only the "contacts" part of the state is persisted in localStorage.
// localStorage Save:

// The savelocalstorage function takes the extracted slice of the state and serializes it (converts it to a JSON string).
// It then saves this serialized state in the browser's localStorage under the key "ReduxStore".
