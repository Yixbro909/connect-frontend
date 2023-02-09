
import { createSlice } from '@reduxjs/toolkit'

type chatsType = {
    username: string,
    message: string,
    timeStamp: string
}

const favoriteRoomSlice = createSlice({
    name: 'chats',
    initialState: {
        favRoom: <any>[]
    },
    reducers: {
        addToFavorite: (state, action) => {
            return { favRoom: [...action.payload] }
        },
        deleteFavorite: (state, action) => {
            const filteredFav = state.favRoom.filter((room: any) => room._id !== action.payload._id)

            return { favRoom: filteredFav }
        }
    }
})

export const { addToFavorite, deleteFavorite } = favoriteRoomSlice.actions

export default favoriteRoomSlice.reducer