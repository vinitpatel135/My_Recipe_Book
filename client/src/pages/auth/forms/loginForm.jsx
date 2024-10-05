import React, { useState } from "react";
import { Form, Input, Button, message, Spin, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../../public/assets/logo.svg";
import "../../../styles/login.css";
import API_BASE_URL from "../../../constant.js";
import { useDispatch, useSelector } from "react-redux";
import { logInStart, logInSuccess, logInFailure } from "../../../redux/user/userSlice";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [localError, setLocalError] = useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(logInStart());
      setLocalError(null);

      // API call for login
      const response = await axios.post(`${API_BASE_URL}/api/v1/users/login`, {
        username: values.username,
        password: values.password,
      });

      dispatch(logInSuccess(response));
      message.success("Login successful");
      navigate("/");

    } catch (err) {
      dispatch(logInFailure(err));
      setLocalError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="formContainerNew">
      <div className="formWrapper">
        <div className="formHeader">
          <img src={logo} alt="logo" className="logoNew" />
          <h2 className="title">Welcome Back</h2>
          <p className="description">
            Log in to your account to access your recipes and saved content.
          </p>
        </div>

        {localError && <Alert message={localError} type="error" showIcon />}
        {error && <Alert message="Server error. Please try again." type="error" showIcon />}

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
                Login
              </Button>
            )}
            <div className="footerLink">
              <Link to="/auth/register" className="loginLink">
                {`Don't have an account? Register`}
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
