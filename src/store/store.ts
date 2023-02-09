import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import chatsSlice from './reducers/chatsSlice';
import favoriteRoomSlice from './reducers/favoriteRoomSlice';


const store = configureStore({
    reducer: {
        auth: authSlice,
        chats: chatsSlice,
        favRoom: favoriteRoomSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;