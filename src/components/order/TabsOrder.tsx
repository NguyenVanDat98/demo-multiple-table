import { AppstoreAddOutlined, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Segmented, Tabs } from 'antd';
import { SegmentedOptions } from 'antd/es/segmented';
import React, { useRef, useState } from 'react';

const stypeDiv: React.CSSProperties = {
    display: "flex",
    justifyContent:'flex-start',
    // gridTemplateRows: "max-content 1fr",
    // flexGrow: 1,
    // flexWrap: "wrap",
    // padding: 10,
    // borderRadius: 8,
    // border: "0.1px solid #333",
    // backgroundColor: "#ffff",
    // paddingTop: 0,
    // overflowX: "hidden",
    // overflowY: "auto",
    // position: "relative",
    // maxHeight:'100%'
  };
  type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function TabsOrder() : React.JSX.Element {
    const [activeKey, setActiveKey] = useState('');
    const newTabIndex = useRef(0);

    const [items,setItems] = useState<{
        label:string,
        key:string
    }[]>([
        {
            label:'Toggle',
            key:"toggle"
        }
    ])
    const onChange = (key: string) => {
        setActiveKey(key);
      };
    
      const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems((items)=>[...items, { label: 'New Tab', key: newActiveKey }]);
        setActiveKey(newActiveKey);
      };
      const remove = (targetKey: TargetKey) => {
        if(items.length==1){
            return
        }
        const targetIndex = items.findIndex((pane) => pane.key === targetKey);
        const newPanes = items.filter((pane) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
          const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
          setActiveKey(key);
        }
        setItems(newPanes);
      };
    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'add') {
        //   add();
        } else {
          remove(targetKey);
        }
      };
    
    return (
        <div style={stypeDiv} >
            <></>
            <Tabs hideAdd
                    style={{
                        width: '100%',
                    }}
                    
                tabBarStyle={{marginBottom:4}}
                onChange={onChange}
                activeKey={activeKey}
                tabBarExtraContent={<Button onClick={()=>{add()}} style={{marginLeft:10}} type='primary' icon={<PlusOutlined />}></Button>}
                type="editable-card"
                onEdit={onEdit}
                items={items}
            />
        </div>
    )
}