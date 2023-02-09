import { createSlice } from '@reduxjs/toolkit'

type chatsType = {
    username: string,
    message: string,
    timeStamp: string
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        chats: <any>[]
    },
    reducers: {
        updateChats: (state, action) => {
            // console.log(action.payload)
            return { chats: [...action.payload] }
        },
        newChat: (state, action) => {
            return { chats: [...state.chats, action.payload] }
        }
    }
})

export const { updateChats, newChat } = chatsSlice.actions

export default chatsSlice.reducer