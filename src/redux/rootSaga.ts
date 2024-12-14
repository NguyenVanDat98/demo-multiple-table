import { delay, put, takeLatest } from "redux-saga/effects";
import { rootAction } from "./modal";

import listServices from '../assets/services.json'
import { PayloadAction } from "@reduxjs/toolkit";
import { serviceActions } from "./actions";


function* service (){
    try {
        yield delay(2000);
        yield put(rootAction.fetchServiceSuccess(listServices))
    } catch (error) {
        yield put(rootAction.fetchServiceFail('error'))
    }
}
function* updateAction ( {payload}:PayloadAction<any>){
    try {
        yield delay(2000);
        if(!payload){
            throw new Error('Invalid')
        }
        yield put(serviceActions.updateSuccess())
    } catch (error) {
        yield put(serviceActions.updateFail('error'))
    }
}
function* rootSaga() {
   yield takeLatest(rootAction.fetchServiceRequest,service)
   yield takeLatest(serviceActions.updateRequest,updateAction)
}
export default rootSaga