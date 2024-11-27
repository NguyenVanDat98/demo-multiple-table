import React from 'react';
import Summary from './Summary';
import TableProducts from './TableProducts';
import { OrderProvider } from './Order.context';
type propsType = {

}
const stypeDiv:React.CSSProperties = {
    height:'100%',
    backgroundColor:'rgb(226 226 226)',
    display: 'flex',
    // flexWrap: 'wrap',
    gap:10,
    padding: 10,
    paddingTop:0
}
export default function OrderScreen(props:propsType) : React.JSX.Element {
    return (
            <OrderProvider>
                <div style={stypeDiv}>
                <TableProducts/>
                <Summary/>
                </div>
            </OrderProvider>
    )
}