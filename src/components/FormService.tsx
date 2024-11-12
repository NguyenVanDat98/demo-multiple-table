import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Table, TableProps } from "antd";
import ConfigProvider from "antd/es/config-provider";
import { BaseOptionType } from "antd/es/select";
import { defaultTo, get } from "lodash";
import React, { useState } from "react";
import services from "../assets/services.json";
type propsType = {};
type DataType = (typeof services)[number];

// const
const rowSelection = (
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>,
  selectedRowKeys: React.Key[]
): TableProps<DataType>["rowSelection"] => ({
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    setSelectedRowKeys(selectedRowKeys);
  },
  selectedRowKeys: selectedRowKeys?.length ? selectedRowKeys : [],
  defaultSelectedRowKeys: selectedRowKeys?.length ? selectedRowKeys : [],

  getCheckboxProps: (record: DataType) => ({
    disabled: false,
    id: record._id,
  }),
});
export default function FormService(props: propsType): React.JSX.Element {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <Row style={{ width: "100%" }} gutter={10}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellPaddingBlockSM: 4,
              cellPaddingInlineMD: 4,
            },
          },
        }}
      >
        <Col span={12} style={{ borderRight: "3px #333 solid" }}>
          <Table
            size="small"
            dataSource={services}
            rowKey={({ _id }) => _id}
            rowSelection={{
              type: "checkbox",
              ...rowSelection(setSelectedRowKeys, selectedRowKeys),
            }}
            scroll={{ y: "60vh" }}
            columns={[
              {
                key: "code",
                title: "Code",
                dataIndex: "code",
                width: 100,
                render(e) {
                  return e;
                },
              },
              {
                title: "Name",
                dataIndex: "name",
                render: (name, record) => {
                  return (
                    <div>{defaultTo(get(name, "vi"), get(name, "vi"))}</div>
                  );
                },
              },
            ]}
            title={() => (
              <TitleAndSearch
                title="Chưa chọn"
                placeholder="Tìm trong chưa chọn"
              />
            )}
          ></Table>
        </Col>
        <Col span={12}>
          <Table
            dataSource={services.filter(({ _id }) =>
              selectedRowKeys.includes(_id)
            )}
            size="small"
            title={() => (
              <TitleAndSearch
                title="Dã chọn"
                placeholder="Tìm trong chưa chọn"
              />
            )}
            sticky={{ offsetHeader: 0 }}
            footer={() => <div></div>}
            rowKey={({ _id }) => _id}
            pagination={false}
            summary={() => (
              <Table.Summary fixed={"bottom"}>
                <Table.Summary.Cell index={0} colSpan={3}>
                  Tổng: {selectedRowKeys.length}
                </Table.Summary.Cell>
              </Table.Summary>
            )}
            scroll={{ y: "60vh" }}
            columns={[
              {
                title: () => (
                  <Button
                    onClick={() => {
                      setSelectedRowKeys([]);
                    }}
                    size="small"
                    danger
                  >
                    {" "}
                    Xoá hết
                  </Button>
                ),
                colSpan: 1,
                dataIndex: "_id",
                align: "center",
                width: "80px",
                render(id) {
                  return (
                    <Button
                      onClick={() => {
                        const newKeys = [...selectedRowKeys];
                        const index = newKeys.indexOf(id);
                        newKeys.splice(index, 1);
                        setSelectedRowKeys(newKeys);
                      }}
                      type="text"
                      danger
                    >
                      <DeleteOutlined />
                    </Button>
                  );
                },
              },
              {
                key: "code",
                title: "Code",
                dataIndex: "code",
                width: 100,
                render(e) {
                  return e;
                },
              },
              {
                title: "name",
                dataIndex: "name",
                render: (name, record) => {
                  return (
                    <div>{defaultTo(get(name, "vi"), get(name, "vi"))}</div>
                  );
                },
              },
            ]}
          ></Table>
        </Col>
      </ConfigProvider>
      {
        // range(100).map((e,i)=><p key={i}>FormService</p>)
      }
    </Row>
  );

  function TitleAndSearch({
    title,
    placeholder,
    options,
  }: {
    title: string;
    options?: BaseOptionType[];
    placeholder: string;
  }) {
    return (
      <Row
        gutter={10}
        justify={"space-between"}
        style={{ width: "100%", paddingRight: 0 }}
      >
        <Col flex={1}>{title}</Col>
        {options?.length && (
          <Select size="small" options={[]} popupMatchSelectWidth={false} />
        )}

        <Col style={{ paddingRight: 0 }}>
          <Input.Search size="small" placeholder={placeholder} enterButton />
        </Col>
      </Row>
    );
  }
}
