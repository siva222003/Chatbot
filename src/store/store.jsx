import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatGptSlice'
import chathistoryReducer from './slices/chatSanitySlice'
const store = configureStore({
    reducer: {
      chat : chatReducer,
      chathistory : chathistoryReducer
    },
  });
  
  export default store;