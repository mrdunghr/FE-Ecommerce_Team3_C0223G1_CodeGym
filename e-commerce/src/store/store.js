import {configureStore} from "@reduxjs/toolkit";
const initialState = null

export const store = configureStore({
    name : "user",
    initialState,
    reducer : {
        updateUser: (state) => {

        }
    }
})