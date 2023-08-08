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
const updateReducer = (state  = false, action) => {
    switch(action.type){
        case "update" :
            return !state
        default:
            return state
    }
}

const updateNotify = (state = 0, action) => {
    switch (action.type){
        case "addNotify":
            console.log(action.payload)
            return state + action.payload
        case "remove":
            return 0
    }
    return state
}
const updateTracks = (state = [], action) =>{
    switch (action.type){
        case "updateTracks":
            console.log(action.payload)
            return [...state, ...action.payload]
        default :
            return state
    }
}
export const store = configureStore({
    reducer: {
        user: userReducer,
        update : updateReducer,
        notify : updateNotify,
        tracks : updateTracks
    },
});

export default store;