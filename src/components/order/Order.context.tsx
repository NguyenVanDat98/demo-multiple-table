/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormInstance, GetRef } from "antd";
import { Form } from "antd";
import React, { PropsWithChildren, useContext } from "react";
// type FormInstance<T> = GetRef<typeof Form<T>>;

export const OrderContext = React.createContext<{
  formOrder?: FormInstance<any> ;
}>({

});
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = (props: PropsWithChildren) => {
  const [formOrder] = Form.useForm();

  return (
    <OrderContext.Provider
      value={{
        formOrder,
      }}
    >
      <Form style={{width:'100%',height:'inherit'}} form={formOrder} onFinish={(e)=>{
        console.log(e)}}>
        {props.children}
      </Form>
    </OrderContext.Provider>
  );
};
