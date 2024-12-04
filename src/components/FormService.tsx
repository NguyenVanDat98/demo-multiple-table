import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Table, TableProps, Tag, Tooltip } from "antd";
import ConfigProvider from "antd/es/config-provider";
import { BaseOptionType } from "antd/es/select";
import { debounce, deburr, defaultTo, get, set, uniq, uniqBy } from "lodash";
import React, { memo, PropsWithChildren, useCallback, useEffect, useState } from "react";
import services from "../assets/services.json";
import { useAppSelector } from "../hook";
type propsType = {
  chooseed?: string[]
};
export type DataType = (typeof services)[number];

const categories = uniqBy(
  services.map(({ category }) => ({
    label: category.name?.vi,
    value: category._id,
  })),
  "value"
);
// const
const rowSelection = (
  selectedRowKeys: React.Key[]
): TableProps<DataType>["rowSelection"] => ({
  selectedRowKeys: selectedRowKeys?.length ? selectedRowKeys : [],
  defaultSelectedRowKeys: selectedRowKeys?.length ? selectedRowKeys : [],

  getCheckboxProps: (record: DataType) => ({
    disabled: false,
    id: record._id,
  }),
});

const deburrSlug = (value: string) => {
  return deburr(value)
    .toLowerCase()
    .replace(/[ắăằâấầậẫẵặẳẩ]/gi, "a")
    .replace(/[ưựữửụũủùú]/gi, "u")
    .replace(/[êệễểẹẽẻ]/gi, "e")
    .replace(/[ọõỏòõộ]/gi, "o");
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let time: any;

export default function FormService({chooseed}: propsType): React.JSX.Element {
  const services = useAppSelector((state)=> state.root.service.data)
  const serviceLoading = useAppSelector((state)=> state.root.service.loading)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [filterNotChoose, setFilterNotChoose] = useState<string | null>(null);
  const [filterChoose, setFilterChoose] = useState<string | null>(null);

  const [valueSearchNotChoose, setValueSearchNotChoose] = useState("");
  const [valueSearchChoose, setValueSearchChoose] = useState("");

  const [servicesNotChoose, setServicesNotChoose] = useState<typeof services>(services);
  const [servicesChoose, setServicesChoose] = useState<typeof services>(services);

  useEffect(() => {
    if(chooseed?.length){
      setSelectedRowKeys(chooseed)
      setServicesChoose(services.filter(({_id})=>chooseed.includes(_id)))
    }
    setServicesNotChoose(services)
  
    return () => {
      
    }
  }, [chooseed,services]);
  const onSearch = useCallback(
    (
      setData: typeof setServicesNotChoose,
      init: DataType[] = [],
      setValue: (value: string) => void
    ) => {
      return (value: string) => {
        setValue(value);
        if (time) {
          clearTimeout(time);
        }
        try {
          if (!value) {
            setData(init);
          } else {
            time = setTimeout(() => {
              const data = [...services].filter(({ name, code }) => {
                const regex = new RegExp(deburrSlug(value), "ig");
                const regexCode = new RegExp(deburrSlug(code), "ig");
                const regexValue = new RegExp(deburrSlug(value), "ig");
                return (
                  regex.test(deburrSlug(name.vi)) ||
                  regexCode.test(deburrSlug(value)) ||
                  regexValue.test(deburrSlug(code))
                );
              });
              setData(data);
            }, 850);
          }
        } catch (error) {
          console.error(error);
        }
      };
    },
    [services]
  );
  const onSearchChoose = useCallback(
    () => onSearch(setServicesChoose,services.filter(({_id})=>selectedRowKeys.includes(_id)) , setValueSearchChoose),
    [onSearch,selectedRowKeys,services]
  );
  const onSearchNotChoose = useCallback(
    () => onSearch(setServicesNotChoose, services, setValueSearchNotChoose),
    [onSearch]
  );

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
          <TableRender
            loading={serviceLoading}
            dataSource={servicesNotChoose}
            filterData={({ category }) =>
              filterNotChoose ? category._id === filterNotChoose : true
            }
            rowSelection={{
              type: "checkbox",
              onChange(keys){
                
                if(filterNotChoose){
                  setSelectedRowKeys((old)=>uniq([...old,...keys]))
                  setServicesChoose(services.filter(({_id})=>([...selectedRowKeys, ...(keys as string[])]).includes(_id)))
                }else {
                  setSelectedRowKeys(keys)
                  setServicesChoose(services.filter(({_id})=>(keys as string[]).includes(_id)))
                }
              },
              ...rowSelection(selectedRowKeys),
            }}
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
                    <Tooltip title={record._id} mouseEnterDelay={1.3}><div>{defaultTo(get(name, "vi"), get(name, "vi"))}</div></Tooltip>
                  );
                },
              },
            ]}
            title={() => (
              <TitleAndSearch
                onSelect={setFilterNotChoose}
                value={filterNotChoose}
                options={categories}
                title="Chưa chọn"
                onChangeValueSearch={onSearchNotChoose()}
                searchValue={valueSearchNotChoose}
                placeholder="Tìm trong chưa chọn"
              />
            )}
          />
        </Col>
        <Col span={12}>
          <TableRender
            loading={serviceLoading}
            dataSource={servicesChoose}
            filterData={({ _id, category }) =>
              selectedRowKeys.includes(_id) &&
              (filterChoose ? category._id === filterChoose : true)
            }
            columns={[
              {
                title: () => {
                  const count = servicesChoose.filter(({ _id, category }) =>
                    selectedRowKeys.includes(_id) &&
                    (filterChoose ? category._id === filterChoose : true))
                  return <Button
                  onClick={() => {
                    setSelectedRowKeys(selectedRowKeys.filter(id=>!count.some(({_id})=>_id===id)));
                  }}
                  size="small"
                  danger
                >
                  Gỡ {Boolean(count.length) &&<Tag color="red" style={{marginInlineEnd:0,marginRight:-8,paddingInline:10,paddingBlock:1}}>{count.length}</Tag> }
                </Button>
                },
                colSpan: 1,
                dataIndex: "_id",
                align: "center",
                width: "100px",
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

            title={() => (
              <TitleAndSearch
                onSelect={setFilterChoose}
                onChangeValueSearch={onSearchChoose()}
                searchValue={valueSearchChoose}
                value={filterChoose}
                options={categories}
                title={"Đã chọn: "+ selectedRowKeys.length}
                placeholder="Tìm trong chưa chọn"
              />
            )}
          />
        </Col>
      </ConfigProvider>
    </Row>
  );
}

type ExtralTable = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterData?: (item: (typeof services)[number]) => boolean;
  dataSource: typeof services;
};



const TableInitProps: Partial<TableProps<DataType>> = {
  size: "small",
  scroll: { y: "60vh" },
  rowKey: '_id',
  pagination: false,
  sticky: { offsetHeader: 0 },
};
const TableRender = memo(
  (
    props: PropsWithChildren<TableProps<DataType> & ExtralTable>
  ) => {
    return (
      <Table
        {...{
          ...TableInitProps,
          ...props,
          dataSource: props.dataSource?.filter(
            props?.filterData ?? (() => true)
          ),
        }}
      />
    );
  }
);
const TitleAndSearch = memo(function ({
  title,
  placeholder,
  options,
  onSelect,
  value,
  onChangeValueSearch,
  searchValue,
}: {
  searchValue?: string;
  onChangeValueSearch?: (value: string) => unknown;
  title: string;
  options?: BaseOptionType[];
  placeholder: string;
  onSelect?: (id: string | null) => void;
  value?: string | null;
}) {
  return (
    <Row
      gutter={10}
      justify={"space-between"}
      style={{ width: "100%", paddingRight: 0 }}
    >
      <Col flex={1}>{title}</Col>
      {options?.length && (
        <Col style={{ minWidth: 100, display: "flex" }}>
          <Select
            style={{ width: "100%" }}
            onClear={() => onSelect!(null)}
            allowClear
            onSelect={onSelect}
            size="small"
            value={value}
            options={options ?? []}
            placeholder='Chọn nhóm dịch vụ'
            popupMatchSelectWidth={false}
          />
        </Col>
      )}

      <Col style={{ paddingRight: 0 }}>
        <Input.Search
          allowClear
          onChange={(e) => onChangeValueSearch!(e.target.value as string)}
          defaultValue={searchValue}
          size="small"
          placeholder={placeholder}
          enterButton
        />
      </Col>
    </Row>
  );
});
