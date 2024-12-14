import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './storie'
import { useEffect } from 'react'
import { notification } from 'antd'
import * as  action from './redux/actions'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()


type MessageType = {
    messageFail?:string,
    messageSuccess?:string,
}
interface Message_  {
    update: MessageType,
    delete: MessageType,
    create: MessageType
}

export const useSetupNotify = (
    actions: (typeof action)[keyof typeof action], 
    messe?:Partial<Message_>
 )=>{
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actions.updateNotifySettings({
            notifyFail:()=>notification.error({ message: messe?.update?.messageFail ?? 'Thao tác cập nhật thất bại'}),
            notifySuccess:()=>notification.success({ message: messe?.update?.messageSuccess ?? 'Thao tác cập nhật thành công'})
        }))

        dispatch(actions.deleteNotifySettings({
            notifyFail:()=>notification.error({message:messe?.delete?.messageFail??'Thao tác xoá thất bại'}),
            notifySuccess:()=>notification.success({message:messe?.delete?.messageSuccess ??'Thao tác xoá thành công'})
        }))

        dispatch(actions.createNotifySettings({
            notifyFail:()=>notification.error({message: messe?.create?.messageFail??'Thao tác tạo thất bại'}),
            notifySuccess:()=>notification.success({message: messe?.create?.messageSuccess ??'Thao tác tạo thành công'})
        }))
        return ()=>{
            dispatch(actions.RESET())
        }
    }, [dispatch]);
}
