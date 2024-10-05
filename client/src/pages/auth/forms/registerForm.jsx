import React, { useState } from "react";
import { Form, Input, Button, message, Spin, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../../public/assets/logo.svg";
import "../../../styles/register.css";
import API_BASE_URL from "../../../constant.js";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      setError(null);

      await axios.post(`${API_BASE_URL}/api/v1/users/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      setIsLoading(false);
      message.success("Registration successful");
      navigate("/auth/login");
    } catch (err) {
      setIsLoading(false);
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="formContainerNew">
      <div className="formWrapper">
        <div className="formHeader">
          <img src={logo} alt="logo" className="logoNew" />
          <h2 className="title">Create Your Account</h2>
          <p className="description">
            Start your journey with us by registering below!
          </p>
        </div>

        {error && <Alert message={error} type="error" showIcon />}

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="newForm"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Username" className="newInput" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" className="newInput" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" className="newInput" />
          </Form.Item>

          <Form.Item>
            {loading ? (
              <Button type="primary" htmlType="submit" className="submitButton" disabled>
                <Spin />
              </Button>
            ) : (
              <Button type="primary" htmlType="submit" className="submitButton">
                Register
              </Button>
            )}
            <div className="footerLink">
              <Link to="/auth/login" className="loginLink">
                Already have an account? Login
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
