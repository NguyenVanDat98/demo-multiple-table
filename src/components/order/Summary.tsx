import {
    Button,
    ConfigProvider,
    Divider,
    Form,
    FormItemProps,
    Input,
    InputNumber,
    Segmented
} from "antd";
import React, { memo, useState } from "react";
import { formatNumber } from "../../util/app";
import { useEffectOrder } from "./hook/effectOrder";
import { useOrder } from "./Order.context";
const stypeDiv: React.CSSProperties = {
  display: "flex",
  backgroundColor: "#FFFFFF",
  flexBasis: 1,
  width: 400,
  flexDirection: "column",
  minWidth: 400,
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
  useEffectOrder()

  return (
    <div style={stypeDiv}>
      <Form.Item name={"userCreate"} style={{ width: "100%", marginBottom: 0 }}>
        <Input size="large" placeholder="Nhập tên khách hàng" />
      </Form.Item>

      <Divider plain variant="solid" />

      <Form.Item {...itemProps}  label={"Tổng tiền"} name={"totalAmount"} initialValue={0}>
        <InputNumber
          readOnly
          style={{ width: "100%" }}
          formatter={formatNumber}
          variant={"filled"}
        />
      </Form.Item>
      <DiscountComponent />
      <Form.Item {...itemProps}  label={"Thành tiền"} name={"totalPayment"}>
        <InputNumber
          readOnly
          style={{ width: "100%" }}
          formatter={formatNumber}
          variant={"filled"}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">Submit</Button>
    </div>
  );
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
      <Form.Item {...itemProps}  label={"Giá trị giảm"} name={"discountValue"}>
        <InputNumber style={{width:'100%'}} readOnly variant="filled" formatter={formatNumber} />
      </Form.Item>
      <Form.Item {...itemProps}  label={"Giảm giá"} name={"discount"}>
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