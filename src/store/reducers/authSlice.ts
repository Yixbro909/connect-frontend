import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        err: ''
    },
    reducers: {
        login: (state, action) => {
            const json = JSON.stringify(action.payload);
            localStorage.user = json;
            return state = { err: '', user: action.payload };
        },
        logOut: (state) => {
            localStorage.removeItem('user');
            return state = { err: '', user: {} }
        },
        handleError: (state, action) => {
            // console.log(action);
            return state = { ...state, err: action.payload }
        }

    }
})

export const { login, logOut, handleError } = authSlice.actions;

export default authSlice.reducer