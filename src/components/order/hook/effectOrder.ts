import { Form } from "antd";
import { useEffect, useRef } from "react";
import { useOrder } from "../Order.context";
export interface Product {
    _id: string;
    name: string;
    productId: string;
    unitPrice: number;
    quantity: number;
    variantId: string;
    totalAmount: number;
}
export const useEffectOrder = () => {
    const { formOrder: form } = useOrder();
    const products: Product[] = Form.useWatch("products", form);
    const totalAmount = Form.useWatch("totalAmount", form);
    const discount = Form.useWatch("discount", form);
    const discountType = Form.useWatch("discountType", form);
    const discountValue = Form.useWatch("discountValue", form);
    const refButton = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

    useEffect(() => {
        if (products?.length) {
            const totalAmount = products.reduce(
                (acc, re) => (acc += re.totalAmount),
                0
            );
            form?.setFieldValue("totalAmount", totalAmount);
        }else {
            form?.setFieldValue("totalAmount", 0);
        }
    }, [products, form]);
    useEffect(() => {
        let value = discount ?? 0;
        if (discountType === "PERCENT") {
            value = Math.floor(totalAmount * ((discount ?? 0) / 100)); 
        }

        if(Number.isNaN(value)) {
            value = 0
        }
            
        form?.setFieldValue("discountValue", value);

    }, [totalAmount, discount, discountType, form]);

    useEffect(() => {

        form?.setFieldValue("totalPayment", totalAmount - discountValue );
    }, [discountValue, totalAmount, form]);
    useEffect(()=>{
        const handleKeyUp = (event:KeyboardEvent) => {
            if (event.key === '`') {
                refButton.current?.click();
            }
          };
        window.addEventListener('keydown',handleKeyUp)
        return ()=>{
            window.removeEventListener('keydown', handleKeyUp);
        }
     },[])
    return {
        totalAmount,
        discountValue,
        refButton
    }
}
