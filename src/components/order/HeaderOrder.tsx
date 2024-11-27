import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Col, Input, InputRef, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
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
        <AutoComplete style={{ width: "100%" }}>
          <Input suffix={<SearchOutlined />} ref={refInputSearch} placeholder='Enter Press "/"' size="large" style={{ width: "100%" }} />
        </AutoComplete>
        </Col>
      </Row>
    );
}