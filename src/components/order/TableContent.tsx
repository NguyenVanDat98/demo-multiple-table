/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Select, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../util/app";
import InputNumberAlign from "../InputNumberAlign";
import dataSource from "./products.json";
import { get } from "lodash";
import { useOrder } from "./Order.context";
type propsType = {};
export interface Variant {
  _id: string;
  variantSearch: Array<string>;
  productId: string;
  isDefault: boolean;
  unitId: UnitID;
  exchangeValue: number;
  barcode: string;
  cost: number;
  price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  codeSequence: number;
  variantCode: string;
}

export interface UnitID {
  description: string;
  status: string;
  _id: string;
  name: string;
  branchId: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}
const nameField = "products"
// dataSource.length = 13;
export default function TableContent(props: propsType): React.JSX.Element {
  const [data, setData] = useState<typeof dataSource>([]);
  const {formOrder:form}=useOrder()
  useEffect(() => {
    setTimeout(() => {
      setData(dataSource);
    }, 1000);
  }, []);

  return (
    <>
      <Form.List name={"products"} initialValue={[]}>
        {() => {
          const column: TableColumnsType<(typeof dataSource)[number]> = [
            {
              title: "",
              width: 40,
              dataIndex: "_id",
              render: (id, r, i) => {

                form?.setFieldValue([nameField,i, "_id"], id);

                return ''
              },
            },
            {
              title: "Tên thuốc",
              dataIndex: "name",
              key: "name",
              ellipsis: true,
              render:(name,r,i)=>{
                form?.setFieldValue([nameField,i, "name"], name);
                form?.setFieldValue([nameField,i, "productId"], r._id);
                return name
              }
            },

            {
              title: "Đơn giá",
              width: 100,
              dataIndex: "productVariants",
              key: "unitPrice",
              align: "end",

              render: (record: Variant[], r, i) => {
                    const price = record.find(({ isDefault }) => isDefault)?.price;
                    form?.setFieldValue([nameField,i, "unitPrice"], price);
                return formatNumber(price);
              },
            },
            {
              title: "Số lượng",
              key: "quantity",
              dataIndex:'quantity',
              align: "center",
              width: 160,
              render: (v,r,i) => {//
                const variantDefaut = r.productVariants.find(({ isDefault:e }) => e);

                    form?.setFieldValue([nameField,i, "quantity"], v??1);

                return (
                    <InputNumberAlign
                        onChange={(value)=>{
                            form?.setFieldValue([nameField,i, "quantity"], value??1);
                        }}
                        style={{ width:'100%'}}
                        min={0}
                        defaultValue={v??1}
                        formatter={formatNumber}
                  />
                );
              },
            },
            {
              title: "Đơn vị",
              dataIndex: "productVariants",
              key: "variant",
              width: 170,
              align: "left",
              render: (record: Variant[],r,i) => {
                const variants = record.map(
                  ({ unitId: { _id: value, name: label }, isDefault }) => ({
                    value,
                    label,
                    isDefault,
                  })
                );
                const variantDefaut = variants.find(({ isDefault:e }) => e);
                
                const MultiVariant = ({defaultValue}:{defaultValue?:any}) => {
                    useEffect(()=>{
                        form?.setFieldValue([nameField,i, "variantId"], defaultValue);
                    },[])
                  return (
                    <Select
                      defaultValue={defaultValue}
                      onSelect={(value)=>{
                        form?.setFieldValue([nameField,i, "variantId"], value);
                      }}
                      options={variants}
                    />
                  );
                };
                if (record.length > 1) {
                    return <MultiVariant defaultValue={variantDefaut?.value}/>;
                }else{
                    form?.setFieldValue([nameField,i, "variantId"], variantDefaut?.value);
                    return variantDefaut?.label;
                }
              },
            },
            {
                title: 'Thành tiền',
                dataIndex: 'totalAmount',
                render:(value,r,i)=>{
                    return <Form.Item noStyle shouldUpdate={(record,preRecord)=>get(record,[nameField,i,'quantity'])!==get(preRecord,[nameField,i,'quantity'])}>
                        {
                            ({setFieldValue,getFieldValue})=>{
                                const getQuantity = getFieldValue([nameField,i,'quantity'])
                                const getPrice = getFieldValue([nameField,i,'unitPrice'])
                                const totalAmount = getQuantity * getPrice;
                                setFieldValue([nameField,i,'totalAmount'],totalAmount)
                                return formatNumber(totalAmount)
                            }
                        }
                    </Form.Item> 
                }

            }
          ];

          return (
            <Table
              rowKey={"_id"}
              columns={column}
              dataSource={data}
              scroll={{x:'auto' }}
              pagination={false}
              bordered

            />
          );
        }}
      </Form.List>

      <Button htmlType="submit">Submit</Button>
    </>
  );
}
