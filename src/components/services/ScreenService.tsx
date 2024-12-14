import React from "react";
import Whitebox from "../Whitebox";
import { Button, Checkbox, ConfigProvider, Flex, Form, Input } from "antd";
import { useAppDispatch, useAppSelector, useSetupNotify } from "../../hook";
import { serviceActions } from "../../redux/reducers/service.reducer";
type propsType = {};

type FormType = {
  name: string;
  group: string;
  category: string;
  typeDefine: string;
  isSuccess: boolean
};
export default function ScreenService(props: propsType): React.JSX.Element {
  const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((s)=>s.service.update)
    useSetupNotify(serviceActions,{
        update: {
            messageFail:'Thất bại'
        }
    })
  return (
    <Whitebox.M2>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 10,
            },
          },
        }}
      >
        <Form<FormType>
          labelCol={{ style: {width:120} }}
          onFinish={(value) => {
            dispatch(serviceActions.updateRequest(value.isSuccess))
          }}
          labelAlign="left"
          labelWrap
          form={form}
        >
          <Flex gap={10}>
            <Flex vertical flex={1}>
              <Form.Item name={"name"} label="Tên Dịch vụ">
                <Input />
              </Form.Item>
              <Form.Item name={"group"} label="Nhóm dịch vụ">
                <Input />
              </Form.Item>
            </Flex>
            <Flex vertical flex={1}>
              <Form.Item name={"category"} label="Danh mục">
                <Input />
              </Form.Item>
              <Form.Item name={"typeDefine"} label="Phân Loại">
                <Input />
              </Form.Item>
            </Flex>
          </Flex>
          <Flex gap={20}>
            <Form.Item name={'isSuccess'} label='Thành công' valuePropName="checked" initialValue={true}>
                <Checkbox />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Cập Nhật
            </Button>
          </Flex>
        </Form>
      </ConfigProvider>
    </Whitebox.M2>
  );
}
