import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useAddNotification, useAddUser } from "../hooks/hooks";
import { toast } from "react-toastify";

const { Option } = Select;

const Notifications = () => {
    const [inputData, setInputData] = useState({});
    const [notificationInput, setNotificationInput] = useState({});
    const [form] = Form.useForm();
    const [notificationForm] = Form.useForm();

    const { mutateAsync: addUserMutation } = useAddUser();
    const { mutateAsync: addNotificationMutation } = useAddNotification();

    

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
        <div style={{ width: "50%", padding: "3rem" }}>
            <h2>Add notification</h2>
            <Form
                form={notificationForm}
                layout="vertical"
                onFinish={handleNotificationSubmit}
            >
                <Form.Item
                    label="Notification Content"
                    name="message"
                    rules={[{ required: true, message: "Please enter Notification Content" }]}
                >
                    <Input.TextArea placeholder="Enter Notification Content" />
                </Form.Item>
                <hr />
                <Form.Item
                    label="Department"
                    name="Department"
                    rules={[{ required: true, message: "Please select Department" }]}
                >
                    <Select placeholder="Select Department">
                        <Option value="all">ALL</Option>
                        <Option value="hr">HR</Option>
                        <Option value="developer">Developer</Option>
                        <Option value="bde">BDE</Option>
                        <Option value="marketing">MARKETING</Option>
                    </Select>
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>
                    Add
                </Button>
            </Form>
        </div>
    );
};

export default Notifications;
