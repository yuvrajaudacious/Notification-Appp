import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useAddNotification, useAddUser } from "../hooks/hooks";
import { toast } from "react-toastify";

const { Option } = Select;

const AdminPage = () => {
  const [inputData, setInputData] = useState({});
  const [notificationInput, setNotificationInput] = useState({});
  const [form] = Form.useForm();
  const [notificationForm] = Form.useForm();

  const { mutateAsync: addUserMutation } = useAddUser();
  const { mutateAsync: addNotificationMutation } = useAddNotification();

  const handleAddUser = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await addUserMutation(values);
      console.log(data.message);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleNotificationSubmit = async () => {
    try {
      const values = await notificationForm.validateFields();
      const { data } = await addNotificationMutation(values);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", padding: "1rem", margin: "1rem " }}>
      <div style={{ width: "50%", padding: "3rem" }}>
        <h2>Add User</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter Name" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter Email" },
              { type: "email", message: "Please enter a valid Email" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter Password" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="DOB"
            rules={[{ required: true, message: "Please enter DOB" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Date Of Joining"
            name="DOJ"
            rules={[{ required: true, message: "Please enter DOJ" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Department"
            name="Department"
            rules={[{ required: true, message: "Please select Department" }]}
          >
            <Select placeholder="Select Department">
              <Option value="developer">Developer</Option>
              <Option value="hr">HR</Option>
              <Option value="bde">BDE</Option>
              <Option value="marketing">MARKETING</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>
            Add User
          </Button>
        </Form>
      </div>
     
    </div>
  );
};

export default AdminPage;
