/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect } from 'react';
import { useOrder } from './Order.context';
import { Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import { formatNumber } from '../../util/app';
type propsType = {

}
const stypeDiv:React.CSSProperties = {
    display: 'flex',
    backgroundColor:'#FFFFFF',
    flexBasis: 1,
    width:400,
    flexDirection: 'column',
    minWidth: 400,
    // flexWrap: 'wrap',
    padding: 10,
    border: '1px solid #333'
}
export interface Product {
    _id:         string;
    name:        string;
    productId:   string;
    unitPrice:   number;
    quantity:    number;
    variantId:   string;
    totalAmount: number;
}
export default memo(function Summary(props:propsType) : React.JSX.Element {
    const {formOrder:form} = useOrder();
     const products :Product[] = Form.useWatch('products',form);
     useEffect(()=>{
        if(products?.length){
            const totalAmount = products.reduce((acc,re)=>acc+=re.totalAmount,0)
            form?.setFieldValue('totalAmount',totalAmount);

        }   
     },[products,form])
    return (
        <div style={stypeDiv}>
            <Form.Item name={'userCreate'} style={{width:'100%'}}>
                    <Input size='large' placeholder='Nhập tên khách hàng'/>
            </Form.Item>
            <Divider plain variant='solid'/>
            <Form.Item label={'Tổng tiền'} name={'totalAmount'}>
                <InputNumber readOnly style={{width:'100%'}} formatter={formatNumber} variant={'borderless'}/>
            </Form.Item>
        </div>
    )
})