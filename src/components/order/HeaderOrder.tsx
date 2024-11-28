/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Card, Col, Divider, Input, InputRef, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useOrder } from './Order.context';
import datasource from './products.json'
import { cloneDeep } from 'lodash';
import { formatNumber } from '../../util/app';
type propsType = {

}
const stypeDiv:React.CSSProperties = {
    flexGrow: 1,
    backgroundColor:'#333',
    position:'sticky',
    top: 0,
    height:74,
    marginInline:-10,
    paddingInline:10,
    zIndex:10

}
export default function HeaderOrder(props:propsType) : React.JSX.Element {
    const { setSeletedProduct}=useOrder()
    const refInputSearch = useRef<InputRef>(null)
    useEffect(() => {
        const handleKeyDown = (event:KeyboardEvent) => {
          if (event.key === '/') {
            refInputSearch.current?.focus()
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      },[]);
    return (
      <Row align={'middle'} justify={'space-between'} style={{ width: "calc(100% + 20px)", ...stypeDiv }}>
        <Col flex={1} style={{ width: "100%", maxWidth: 500 }}>
        <AutoComplete style={{ width: "100%" }} 
            onSelect={(id,{data})=>{
                setSeletedProduct((old)=>{
                    return old.concat(data);
                })
            }}
            listHeight={400}
            options={
                datasource.map((props:any)=>{
                    const clone =cloneDeep(props) as ProductBase
                    const variant = clone.productVariants.find(({isDefault:e})=>e);

                    return {
                        value: props._id,
                        label: <Card title={clone.name} size='small'>
                            <Row style={{width:'100%'}}>
                                <Col flex={1}>
                                    <LabelAndValue value={formatNumber(variant?.price??0)} label='Giá'/>
                                    <LabelAndValue value={variant?.unitId.name??0} label='Đơn vị'/>
                                </Col>
                                <Col style={{width:70}}>{}</Col>
                            </Row>
                      
                        </Card>,
                        data: clone
                    }
                })
            }
            >
                <div>
                    <Input suffix={<SearchOutlined />} ref={refInputSearch} placeholder='Enter Press "/"' size="large" style={{ width: "100%" }} />
                </div>
        </AutoComplete>
        </Col>
      </Row>
    );
    type Props ={label?:string,value:any}
    function LabelAndValue(props:Props){
            return <Row style={{width:'100%'}}>
                {props.label&& <Col span={4}>{props.label}</Col>}
                <Col><Divider plain orientation='center' variant='solid' type='vertical'/></Col>
                <Col flex={1}>{props.value}</Col>
            </Row>
    }
}