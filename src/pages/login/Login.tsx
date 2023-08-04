import React, { useState } from "react";
import "./style.css";
import { Button, Form, Input, notification } from "antd";
import { useLoginAuth } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

// ... (imports)

const Login: React.FC = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [form] = Form.useForm();
  const { mutateAsync: loginMutation } = useLoginAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const { data } = await loginMutation(inputData);
      if (data.message === "Login successfully") {
        console.log(data.token)
        localStorage.setItem("authToken", data.token);
        notification.success({
          message: "Success",
          description: data.message,
        });
        navigate("/");
        window.location.reload();

      } else {
        notification.error({
          message: "Login Failed",
          description: "Invalid email or password. Please try again.",
        });
      }
    } catch (error: any) {
      console.log(error);
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="loginpage">
      <div className="loginContainer">
        <h3>Login</h3>
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={inputData}
          layout="vertical"
        >
          {/* Email input */}
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="name@example.com"
              onChange={(e) => {
                const newInputData = { ...inputData, email: e.target.value };
                setInputData(newInputData);
                console.log("Email input change:", newInputData);
              }
              }
            />
          </Form.Item>

          {/* Password input */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(e) => {
                const newInputData = { ...inputData, password: e.target.value };
                setInputData(newInputData);
                console.log("password input change:", newInputData);
              }}
            />
          </Form.Item>

          {/* Login button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                fontWeight: "bolder",
                marginTop: "5px",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;



