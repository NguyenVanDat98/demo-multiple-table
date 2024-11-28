/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Card, Col, Divider, Image, Input, InputRef, notification, Row, Spin, Tooltip, Typography } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useOrder } from './Order.context';
import { cloneDeep } from 'lodash';
import { formatNumber } from '../../util/app';
import request from '../../util/request';
import notFound from '../../assets/not-found.svg'
import { useTable } from './TableBody';

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
export default function HeaderOrder() : React.JSX.Element {
    const { seletedProduct,setSeletedProduct,setProducts,products } = useOrder();
    const { add } = useTable()
    const [loading,setLoading] = useState(true)
    const [fastTooltip,setFastTooltip] = useState(false)
    const refInputSearch = useRef<InputRef>(null);
    const reftime = useRef<number>(0);
    useEffect(() => {
        request.searchProducts({keyword: ''})
            .then(setProducts)
            .catch((error)=>notification.error({message:error?.message}))
            .finally(()=>setLoading(false));
      
        const handleKeyDown = (event:KeyboardEvent) => {
          if (event.key === '/') {

            refInputSearch.current?.focus()
          }
        };
    
        window.addEventListener('keyup', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      },[]);
    const onchange :React.ChangeEventHandler<HTMLInputElement>= useCallback(async(value)=>{
        setLoading(true);
        if(reftime.current){
            clearTimeout(reftime.current)
        }
        reftime.current = setTimeout(async() => {
            const data = await request.searchProducts({keyword: value?.target?.value});
            setProducts(data);
            setLoading(false)
        }, 800);

      
    },[setProducts,setLoading])
    return (
      <Row align={'middle'} justify={'space-between'} style={{ width: "calc(100% + 20px)", ...stypeDiv }}>
        <Col flex={1} style={{ width: "100%", maxWidth: 600 }}>
        <AutoComplete style={{ width: "100%" }} 
            onSelect={(id,{data})=>{
                const variant = data.variants.find(({variantIsDefault:e})=>e)
                add({
                    totalAmount:0,
                    _id:id,
                    name:data.name,
                    productId:data._id,
                    quantity:1,
                    unitPrice:variant?.price??0,
                    variantId:String(variant?._id),
                })
                setSeletedProduct((old)=>{
                    return old.concat(data);
                })
            }}
            listHeight={500}
            notFoundContent={<div style={{display:'grid',placeContent:'center',placeItems:'center'}}><Image src={notFound} preview={false} height={100}/></div>}
            options={
                products.map(renderOption)
            }
            >
                <div>
                    <Input  onChange={onchange} suffix={ loading ? <Spin  size='small' indicator={<LoadingOutlined spin/>}/>:<SearchOutlined />} ref={refInputSearch} placeholder='Enter Press "/"' size="large" style={{ width: "100%" }} />
                </div>
        </AutoComplete>
        </Col>
      </Row>
    );
    type Props ={label?:string,value:any,strong?:boolean,fontsize?:number,disabled?:boolean}

    function renderOption (props:any){
        const clone = cloneDeep(props) as ProductBase
        
        const variant = clone?.variants.find(({variantIsDefault})=>variantIsDefault);
        const disabled = seletedProduct.some(({_id})=>String(_id)===String(clone._id));
        return {
            value: clone._id,
            disabled,
            label: <Tooltip  title={clone.productDetail.element} arrow placement='right' afterOpenChange={(e)=>{
                if(e){
                    setFastTooltip(true)
                    clearTimeout(reftime.current);
                }else{
                    reftime.current = setTimeout(() => {
                        setFastTooltip(false)
                    }, 3000);
                }
            }} mouseEnterDelay={fastTooltip?0:1.4} >
                <Card style={{background:disabled ?'#e0e0e0' :'',color: disabled?'rgba(0, 0, 0, 0.25)':''}} title={clone.name} size='small' >
                <Row style={{width:'100%'}}>
                    <Col flex={1}>
                        <LabelAndValue disabled={disabled} value={`[ ${clone.codeBySupplier} ]`} label='Mã'/>
                        <LabelAndValue disabled={disabled} value={formatNumber(variant?.price??0)} strong fontsize={16} label='Giá'/>
                        <LabelAndValue disabled={disabled} value={variant?.unit.name??0} label='Đơn vị'/>
                        <LabelAndValue disabled={disabled} value={clone?.productGroup.name} label='Nhóm '/>
                        <LabelAndValue disabled={disabled} value={clone?.supplier.name} label='Nhà cung cấp '/>
                    </Col>
                    <Col style={{width:70,height:'100%',marginBlock:-10 }}>{<Image height={'100%'} src={clone.images[0]} preview={false} loading='lazy'/>}</Col>
                </Row>
            </Card>
            </Tooltip>,
            data: clone
        } 
    }
    function LabelAndValue(props:Props){
            return <Row style={{width:'100%'}}>
                {props.label&& <Col style={{width:100}}>{props.label}</Col>}
                <Col><Divider plain orientation='center' variant='solid' type='vertical'/></Col>
                <Col flex={1}><Typography.Text disabled={props.disabled} strong={props.strong} style={{fontSize:props.fontsize}}>{props.value}</Typography.Text></Col>
            </Row>
    }
}