import React from "react";
import { Form, Input, Select } from "antd";

export const ProtocolListFormDialog = (props) => {
  return (
    <Form name="updateProtocol" preserve={false} form={props.form} onFinish={props.onFinish}>
      <Form.Item label="Название" name="title" rules={[{ required: true, message: "Название не может быть пустым" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Тип" name="type" rules={[{ required: true, message: "Выберите тип протокола" }]}>
        <Select placeholder="Тип Протокола">
          <Select.Option value="Type 1">Тип 1</Select.Option>
          <Select.Option value="Type 2">Тип 2</Select.Option>
          <Select.Option value="Type 3">Тип 3</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
