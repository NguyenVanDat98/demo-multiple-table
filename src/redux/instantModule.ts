import { SliceCaseReducers } from "@reduxjs/toolkit";
import { get } from "lodash";


const initAction = {
    loading: false,
    notifySuccess: function () { },
    notifyFail: function () { },
}

export const INITIAL_STATE = {
    data: {
        docs: [] as any[],
        loading: false,
        paging: {
            limit: 10,
            page: 1
        },
    },
    byId: {
        data: {},
        id: '' as string,
        loading: false,
    },
    update: initAction,
    delete: initAction,
    create: initAction,

}
const getPaging = (body: any) => ({
    page: Number(get(body, 'page', 1)),
    limit: Number(get(body, 'limit', 10))
})

export const INIT_REDUCER = {
    getDataRequest(state) {
        state.data.loading = true
    },
    getDataSuccess(state, { payload }) {
        state.data.docs = get(payload, 'docs', [])
        state.data.paging = getPaging(payload)
        state.data.loading = false
    },
    getDataFail(state, { payload }) {
        state.data.loading = false
    },


    getByIdRequest(state) {
        state.byId.loading = true
    },
    getByIdSucces(state, { payload }) {
        state.byId.loading = false
        state.byId.data = payload
    },
    getByIdFail(state, { payload }) {
        state.byId.loading = false
    },



    updateNotifySettings(state, { payload: { notifyFail, notifySuccess } }) {
        state.update.notifyFail = notifyFail
        state.update.notifySuccess = notifySuccess
    },

    deleteNotifySettings(state, { payload: { notifyFail, notifySuccess } }) {
        state.delete.notifyFail = notifyFail
        state.delete.notifySuccess = notifySuccess
    },
    createNotifySettings(state, { payload: { notifyFail, notifySuccess } }) {
        state.create.notifyFail = notifyFail
        state.create.notifySuccess = notifySuccess
    },

    updateRequest(state, { payload }) {
        state.update.loading = true
    },

    updateSuccess(state) {
        state.update.loading = false
        state.update.notifySuccess()
    },
    updateFail(state, { payload }) {
        state.update.loading = false
        state.update.notifyFail()
    },

    RESET(state) {
        state = INITIAL_STATE;
    }

} satisfies SliceCaseReducers<typeof INITIAL_STATE>



