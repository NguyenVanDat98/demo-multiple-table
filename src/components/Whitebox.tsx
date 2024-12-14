import React, { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
type propsType = {

}
type Attributes = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function Whitebox (props:PropsWithChildren<propsType>) : React.JSX.Element {
    return (
        <div className='whitebox'>{props.children}</div>
    )
}

Whitebox.M2 = forwardRef(function(props:Attributes,ref: React.ForwardedRef<HTMLDivElement> ){
    return <div 
        ref={ref} 
        className='whitebox' 
        style={{margin:20,...props.style}}> 
            {props.children && props.children}
        </div>
})

export default Whitebox