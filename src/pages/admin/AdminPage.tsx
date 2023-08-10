import React from "react";
import { Button, Form, Input, Select } from "antd";
import { useAddUser } from "../hooks/hooks";
import { toast } from "react-toastify";

const { Option } = Select;

interface UserFormData {
  name: string;
  email: string;
  password: string;
  DOB: string;
  DOJ: string;
  Department: string;
}

const AdminPage = () => {
  const [form] = Form.useForm();

  const { mutateAsync: addUserMutation } = useAddUser();

  const handleAddUser = async (values: UserFormData) => {
    try {
      const { data } = await addUserMutation(values);
      console.log(data.message);
      toast.success(data.message);
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  };

  const handleAddUserFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      await handleAddUser(values);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateMaxDate = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    return currentDate.toISOString().split("T")[0];
  };

  return (
    <div style={{ display: "flex", padding: "1rem", margin: "1rem " }}>
      <div style={{ width: "50%", padding: "3rem" }}>
        <h2>Add User</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUserFormSubmit}
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
            rules={[
              { required: true, message: "Please enter DOB" },
              // {np
              //   validator: (_, value) => {
              //     if (value) {
                   
              //     }
              //   },
              // },
            ]}
          >
            <Input type="date" max={calculateMaxDate()} />
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
