import {configureStore} from "@reduxjs/toolkit";



const initialState = null;
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'updateUser':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;