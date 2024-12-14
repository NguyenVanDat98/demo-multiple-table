import { createSlice } from "@reduxjs/toolkit";
import { DataType } from "../components/FormService";
import { INIT_REDUCER, INITIAL_STATE } from "./instantModule";


const rootReducer = createSlice({
    name:'root',
    initialState:{
        ...INITIAL_STATE,
        service:{
            loading:false,
            data: [] as DataType[],
            getFail:null as any,
            actionSeccess:null as any,
            paging: {
                page: 1,
                limit :10
            }
        }
        
    },
    reducers:{
        ...INIT_REDUCER,
        fetchServiceRequest (state){
            state.service.loading = true;
            state.service.getFail = null;
        },
        fetchServiceSuccess (state,{payload}){
            state.service.loading = false;
            state.service.actionSeccess = 'success';
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



export default rootReducer.reducer