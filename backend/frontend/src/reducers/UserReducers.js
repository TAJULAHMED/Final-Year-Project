import { createSlice } from "@reduxjs/toolkit"; 

const initialState = { name: '', email: '', loggedIn: false, verified: false, income: null, age: null, postcode: null, radius: null, deposit: null};
// Slice for user data with handlers for login, logout, verification status, name changes, and preferences updates
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
            state.income = initialState.income;
            state.age = initialState.age;
            state.postcode = initialState.postcode;
            state.radius = initialState.radius;
            state.deposit = initialState.deposit;
        },
        verified: (state, action) => {
            state.verified = action.payload
        },
        namechange: (state, action) => {
            state.name = action.payload.name;
        },
        preferences: (state, action) => {
            state.income = action.payload.income
            state.age = action.payload.age
            state.postcode = action.payload.postcode
            state.radius = action.payload.radius
            state.deposit = action.payload.deposit
        }

    }
});

export const { login, logout, verified, namechange, preferences } = userSlice.actions;

export default userSlice.reducer;
