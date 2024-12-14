import { createSlice } from "@reduxjs/toolkit";
import { INIT_REDUCER, INITIAL_STATE } from "../instantModule";

const initialState = {
    ...INITIAL_STATE,
}
const serviceSlice = createSlice({
    name:'service',
    initialState:initialState,
    reducers:{
        ...INIT_REDUCER,
        RESET(state){
            state = initialState
        }
    }
})

export const serviceActions = serviceSlice.actions

 const serviceReducer = serviceSlice.reducer
 export default serviceReducer