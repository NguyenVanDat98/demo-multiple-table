/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

export default function InputNumberAlign(props:React.PropsWithChildren<InputNumberProps<any>> & React.RefAttributes<HTMLInputElement>) : React.JSX.Element {
    return (
        <InputNumber className='align-input-number' {...props}/> 
    )
}