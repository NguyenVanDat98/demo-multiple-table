import { createSlice } from "@reduxjs/toolkit";
import { DataType } from "../components/FormService";

const rootReducer = createSlice({
    name:'root',
    initialState:{
        service:{
            loading:false,
            data: [] as DataType[],
            getFail:null
        }
        
    },
    reducers:{
        fetchServiceRequest (state){
            state.service.loading = true;
            state.service.getFail = null;

        },
        fetchServiceSuccess (state,{payload}){
            state.service.loading = false;
            state.service.data = payload;
            state.service.getFail = null;

        },
        fetchServiceFail(state,{payload}){
            state.service.loading = false;
            state.service.getFail = payload;

        }
    }
})

export const rootReduce = rootReducer.selectors
export const rootAction = rootReducer.actions

export default rootReducer