import { createSlice } from "@reduxjs/toolkit";
import client from "../client";

const initialState = {
  data: [],
  titles: [],
  loading: false,
  error: null,
};

const chatSanitySlice = createSlice({
  name: "chathistory",
  initialState,
  reducers: {
    setState : (state, action) =>{
      state.data = action.payload.chat;
      const {_id,title} = action.payload
      state.titles.push({_id,title})
    },
    getChatHistory: (state, action) => {
      state.data = action.payload;
    },
    getTitles: (state, action) => {
      state.titles = action.payload;
    },
    patchChatHistory: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

//Create New Chat History
const createChatHistory = (newChatHistoryData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const newChatHistory = {
        _type: 'chathistory',
        title: 'New One ',
        user: {
          _type: 'reference',
          _ref: '8fa69916-40ae-4a3c-88de-3d6e1cf8250d'
        },
        chat : [newChatHistoryData]
      };
      const response = await client.create(newChatHistory);
      dispatch(setState(response))
      console.log("Created chat history:", response);
    } catch (error) {
      console.error("Error creating chat history:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

//Fetch Titles of Chat
const fetchChatTitles = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await client.fetch(
        '*[_type == "chathistory"]{_id,title}'
      );
      dispatch(getTitles(response));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

//Fetch Title Related Chat History
const fetchChatHistory = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await client.fetch(
        `*[_type == "chathistory" && _id == "${id}"]`
      );
      dispatch(getChatHistory(response[0].chat));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

//Adding/Updating the chat array
const updateChatHistory = (id, newChatData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const patch = client.patch(id).append("chat", [newChatData]);
      const response = await patch.commit();
      console.log("Pushed to chat array:", response);
      dispatch(patchChatHistory(response.chat));
    } catch (error) {
      console.error("Error pushing to chat array:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// const handleDelete = () => {
//   const deleteChatHistory = async (chatHistoryId) => {
//     try {
//       await client.delete(chatHistoryId);
//       console.log("Deleted chat history with ID:", chatHistoryId);
//     } catch (error) {
//       console.error("Error deleting:", error);
//     }
//   };

//   const chatHistoryId = "5d3efa2b-c148-4e80-9c2a-62ec0d04b821";
//   deleteChatHistory(chatHistoryId);
// };

export const {
  getChatHistory,
  getTitles,
  setLoading,
  setError,
  patchChatHistory,
  setState
} = chatSanitySlice.actions;
export { fetchChatHistory, fetchChatTitles, updateChatHistory,createChatHistory };
export default chatSanitySlice.reducer;
