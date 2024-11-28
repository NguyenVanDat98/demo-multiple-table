/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Image, Input, Select, Table, TableColumnsType } from "antd";
import { get } from "lodash";
import React, { useEffect } from "react";
import { formatNumber } from "../../util/app";
import InputNumberAlign from "../InputNumberAlign";
import { useOrder } from "./Order.context";

const nameField = "products";
export default function TableContent(): React.JSX.Element {
  const { formOrder: form, seletedProduct:data } = useOrder();

  return (
    <>
      <Form.List name={"products"} initialValue={[]}>
        {() => {
          const column: TableColumnsType<(ProductBase)> = [
            {
              title: "",
              width: 40,
            colSpan:0,
              dataIndex: "_id",
              render: (id, r, i) => {
                form?.setFieldValue([nameField, i, "_id"], id);

                return <Image.PreviewGroup items={r.images}>
                    <Image width={70} height={70} src={r.images[0]} />
                </Image.PreviewGroup>;
              },
            },
            {
              title: "Tên thuốc",
              colSpan:2,
              dataIndex: "name",
              key: "name",
              ellipsis: true,
              render: (name, r, i) => {
                form?.setFieldValue([nameField, i, "name"], name);
                form?.setFieldValue([nameField, i, "productId"], r._id);
                return `[ ${r.codeBySupplier} ] - ${name}`;
              },
            },

            {
              title: "Đơn giá",
              width: 170,
              dataIndex: "variants",
              key: "unitPrice",
              align: "end",
              render: (record: Variant[], r, i) => {
                return (
                  <Form.Item
                    noStyle
                    shouldUpdate={(r, p) => {
                      return (
                        get(r, [nameField, i, "variantId"]) !==
                        get(p, [nameField, i, "variantId"])
                      );
                    }}
                  >
                    {() => {
                    const variantId = form?.getFieldValue([ nameField, i, "variantId", ]);
                  const { price } = r.variants.find(({ variantIsDefault: e, _id }) => variantId ? String(_id) === String(variantId) : e) ?? { price: 0 };

                  form?.setFieldValue([nameField, i, "unitPrice"], price);

                      return (
                        <Form.Item noStyle>
                          <Input styles={{
                            input:{textAlign:'end'}
                          }} readOnly value={formatNumber(price)} variant="borderless" />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                );
              },
            },
            {
              title: "Số lượng",
              key: "quantity",
              dataIndex: "quantity",
              align: "center",
              width: 160,
              render: (v, r, i) => {
                const variantId = form?.getFieldValue([
                  nameField,
                  i,
                  "variantId",
                ]);

                const { exchangeValue } = r.variants.find(
                  ({ isDefault: e, _id }) =>
                    variantId ? String(_id) === String(variantId) : e
                ) ?? { exchangeValue: 1 };

                form?.setFieldValue([nameField, i, "quantity"], (v ?? 1)*exchangeValue);

                return (
                  <InputNumberAlign
                    onChange={(value) => {
                      form?.setFieldValue(
                        [nameField, i, "quantity"],
                        (value ?? 1) * exchangeValue
                      );
                    }}
                    style={{ width: "100%" }}
                    min={0}
                    defaultValue={(v ?? 1) / exchangeValue}
                    parser={(val) => {
                      return (
                        Number(String(val).replace(/[.,]/gi, "")) *
                        exchangeValue
                      );
                    }}
                    formatter={(v) => {
                      return formatNumber(v);
                    }}
                  />
                );
              },
            },
            {
              title: "Đơn vị",
              dataIndex: "variants",
              key: "variant",
              width: 170,
              align: "left",
              render: (record: Variant[], r, i) => {
                const variants = record.map(
                  ({ _id:value, unit: { name: label }, variantIsDefault:isDefault }) => ({
                    value,
                    label,
                    isDefault,
                  })
                );
                const variantDefaut = variants.find(({ isDefault: e }) => e);

                const MultiVariant = ({
                  defaultValue,
                }: {
                  defaultValue?: any;
                }) => {
                  useEffect(() => {
                    form?.setFieldValue(
                      [nameField, i, "variantId"],
                      defaultValue
                    );
                  }, []);
                  return (
                    <Select
                    style={{width:'100%'}}
                    variant="filled"
                      defaultValue={defaultValue}
                      onSelect={(value) => {
                        form?.setFieldValue([nameField, i, "variantId"], value);
                      }}
                      options={variants}
                    />
                  );
                };
                if (record.length > 1) {
                  return <MultiVariant defaultValue={variantDefaut?.value} />;
                } else {
                  form?.setFieldValue(
                    [nameField, i, "variantId"],
                    variantDefaut?.value
                  );
                  return <div style={{paddingInline:10}}>{variantDefaut?.label}</div>;
                }
              },
            },
            {
              title: "Thành tiền",
              dataIndex: "totalAmount",
              width: 180,
              render: (value, r, i) => {
                return (
                  <Form.Item
                    noStyle
                    shouldUpdate={(record, preRecord) =>
                      get(record, [nameField, i, "quantity"]) !==
                      get(preRecord, [nameField, i, "quantity"]) ||
                      get(record, [nameField, i, "unitPrice"]) !==
                      get(preRecord, [nameField, i, "unitPrice"])
                    }
                  >
                    {({ setFieldValue, getFieldValue }) => {
                      const {quantity,unitPrice} = getFieldValue([nameField,i]);
                      const totalAmount = quantity * unitPrice;
                      setFieldValue([nameField, i, "totalAmount"], totalAmount);
                      return formatNumber(totalAmount);
                    }}
                  </Form.Item>
                );
              },
            },
          ];

          return (
            <Table
              rowKey={"_id"}
              columns={column}
              dataSource={data}
              scroll={{ x: "auto" }}
              pagination={false}
              bordered
            />
          );
        }}
      </Form.List>
    </>
  );
}
