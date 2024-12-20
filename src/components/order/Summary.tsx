import {
    Button,
    ConfigProvider,
    Divider,
    Form,
    FormItemProps,
    Input,
    InputNumber,
    Segmented,
    Tooltip,
} from "antd";
import React, { memo, PropsWithChildren, useState } from "react";
import { formatNumber } from "../../util/app";
import { useEffectOrder } from "./hook/effectOrder";
import { useOrder } from "./Order.context";
const stypeDiv: React.CSSProperties = {
  display: "flex",
  backgroundColor: "#FFFFFF",
  flexBasis: 1,
  width: 400,
  flexDirection: "column",
  minWidth: 300,
  // flexWrap: 'wrap',
  padding: 10,
  border: "1px solid #333",
};
const itemProps:FormItemProps={
    labelCol:{
        span:7
    },
    labelAlign:'left',

}

export default memo(function Summary(): React.JSX.Element {
 const {
    totalAmount,
    discountValue,
    refButton,
} = useEffectOrder();

  return (
    <div style={stypeDiv}>
      <Form.Item name={"userCreate"} style={{ width: "100%", marginBottom: 0 }}>
        <Input size="large" placeholder="Nhập tên khách hàng" />
      </Form.Item>

      <Divider plain variant="solid" />

      <Form.Item {...itemProps} style={{marginBottom:4}}  label={"Tổng tiền"} name={"totalAmount"} initialValue={0}>
        <InputNumber
          readOnly
          style={{ width: "100%" }}
          formatter={formatNumber}
          variant={"filled"}
        />
      </Form.Item>
      <Divider plain variant="solid" />

      <DiscountComponent />
      <Divider plain variant="solid" />
    <DetailTotalPayment title={ totalAmount?`Tổng tiền (${formatNumber(totalAmount)}) - Giá trị giảm (${formatNumber(discountValue)})`:'' }>
        <Form.Item {...itemProps} style={{marginBottom:4}}  label={"Thành tiền"} name={"totalPayment"}>
            <InputNumber
            readOnly
            style={{ width: "100%" }}
            formatter={formatNumber}
            variant={"filled"}
            />

        </Form.Item>
    </DetailTotalPayment>
    <Divider plain variant="solid" />
      <Button ref={refButton} style={{
        marginTop:'auto',
        height:70,
        fontSize:18
      }} type="primary" htmlType="submit">Submit (Enter Press P)</Button>
    </div>
  );
  function DetailTotalPayment({children,...props}:PropsWithChildren<{title:any}>){
    return <Tooltip overlayInnerStyle={{width:'max-content'}} trigger={'focus'} mouseEnterDelay={1.4} title={props?.title}>{children}</Tooltip>
  }
});

const DiscountComponent = memo(function () {
  const { formOrder: form } = useOrder();
  const [state, setState] = useState<"PERCENT" | "VALUE">("PERCENT");
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemActiveBg: "#69b1ff",
            itemSelectedBg: "#69b1ff",
            itemSelectedColor: "white",
          },
        },
      }}
    >
      <Form.Item
        name={"discountType"}
        hidden
        noStyle
        dependencies={[state]}
        initialValue={state}
      >
        <Input />
      </Form.Item>
      <Form.Item {...itemProps}  label={"Giảm giá"} name={"discount"} initialValue={0}>
        <InputNumber
          addonAfter={
            <AddonAfter/>
          }
          min={0}
          max={state === "PERCENT" ? 100 : form?.getFieldValue("totalAmount")}
          style={{ width: "100%" }}
          keyboard
          formatter={formatNumber}
          inputMode="numeric"
          parser={(val) => {
            return Number(String(val).replace(/[.,]/gi, ""));
          }}
          variant={"outlined"}
        />
      </Form.Item>
      <Form.Item {...itemProps} style={{marginBottom:4}} label={"Giá trị giảm"} name={"discountValue"}>
        <InputNumber style={{width:'100%'}} readOnly variant="filled" formatter={formatNumber}  addonAfter={'VNĐ'}/>
      </Form.Item>
    </ConfigProvider>
  );
  function AddonAfter (){
    return <Segmented<"PERCENT" | "VALUE">
    onChange={(object) => {
      setState(object);
      form?.setFieldValue("discountType", object);
    }}
    defaultValue={state}
    options={[
      { value: "PERCENT", label: "%" },
      { value: "VALUE", label: "VND" },
    ]}
  />
  }
});
