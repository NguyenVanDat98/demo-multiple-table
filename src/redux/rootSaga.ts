import { delay, put, takeLatest } from "redux-saga/effects";
import { rootAction } from "./modal";

import listServices from '../assets/services.json'


function* service (){
    try {
        yield delay(2000);
        yield put(rootAction.fetchServiceSuccess(listServices))
    } catch (error) {
        yield put(rootAction.fetchServiceFail('error'))
    }
}
function* rootSaga() {
   yield takeLatest(rootAction.fetchServiceRequest.type,service)
}
export default rootSaga