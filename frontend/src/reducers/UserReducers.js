import { createSlice } from "@reduxjs/toolkit"; 

// Simplified initial state
const initialState = { name: '', email: '', loggedIn: false, verified: false };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            // Update state properties directly
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.loggedIn = action.payload.loggedIn;
            state.verified = action.payload.verified;
        },
        logout: (state) => {
            // Reset each property individually
            state.name = initialState.name;
            state.email = initialState.email;
            state.loggedIn = initialState.loggedIn
            state.verified = initialState.verified;
        },
        verified: (state, action) => {
            state.verified = action.payload
        },
        namechange: (state, action) => {
            state.name = action.payload.name;
        }

    }
});

export const { login, logout, verified, namechange } = userSlice.actions;

export default userSlice.reducer;
