/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormInstance } from "antd";
import { Form } from "antd";
import React, { PropsWithChildren, useContext, useState } from "react";
// type FormInstance<T> = GetRef<typeof Form<T>>;

export const OrderContext = React.createContext<{
  formOrder?: FormInstance<any>;
  setSeletedProduct: React.Dispatch<React.SetStateAction<ProductBase[]>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductBase[]>>;
  seletedProduct: ProductBase[];
  products: ProductBase[];
}>({
  setSeletedProduct: () => {},
  setProducts: () => {},
  seletedProduct: [],
  products:[],
});
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = (props: PropsWithChildren) => {
  const [formOrder] = Form.useForm();
  const [seletedProduct, setSeletedProduct] = useState<ProductBase[]>([]);
  const [products,setProducts]= useState<ProductBase[]>([]);  

  return (
    <OrderContext.Provider
      value={{
        formOrder,
        seletedProduct,
        setSeletedProduct,
        products,
        setProducts
      }}
    >
      <Form
        style={{ width: "100%", height: "inherit" }}
        form={formOrder}
        onFinish={(e) => {
          console.log(e);
        }}
      >
        {props.children}
      </Form>
    </OrderContext.Provider>
  );
};
