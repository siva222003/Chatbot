    import { createSlice } from "@reduxjs/toolkit";
    import {updateChatHistory,createChatHistory} from './chatSanitySlice'
    import axios from 'axios'

    const initialState = {
    data: [{ role: "system", content: "you are a helpful assistant and you give asnswers in a very detailed way"}],
    loading: false,
    error: null,
    };

    const chatGptSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat: (state, action) => {
        state.data.push(action.payload)
        },
        setLoading: (state, action) => {
        state.loading = action.payload;
        },
        setError: (state, action) => {
        state.error = action.payload;
        },
    },
    });

    const chatCompletion = (input,state,id) =>
    {
        return async (dispatch) => {
            const apiKey = import.meta.env.VITE_API_KEY;
            const endpoint = import.meta.env.VITE_API_URI;
        
            try { 
                dispatch(setLoading(true))
            const userMessage = { role: "user", content: input };
            const updatedMessages = [...state, userMessage];
        
            const response = await axios.post(
                endpoint,
                {
                model: "gpt-3.5-turbo",
                messages: updatedMessages,
                },
                {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                }
            );
        
            const assistantResponse = response.data.choices[0].message.content;
            const assistantMessage = {
                role: "assistant",
                content: assistantResponse,
            };
            dispatch(setChat(assistantMessage))
            const newPair = {question : input,answer : assistantResponse};
            if(id){
                dispatch(updateChatHistory(id,newPair))
            }else{
                dispatch(createChatHistory(newPair))
            }
            
            } catch (error) {
            console.error("Error:", error);
            }finally{
                dispatch(setLoading(false))
            }
        };
    }


    export const { setChat, setLoading, setError } =
    chatGptSlice.actions;
    export {
    chatCompletion
    };
    export default chatGptSlice.reducer;