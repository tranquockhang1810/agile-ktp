"use client";
import { Button, Col, Form, Input, Row, Spin } from "antd";

const Login = () => {
  return (
    <div
      className="max-w-[600px] p-6 h-full border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center items-center mx-auto mt-6"
      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <Form
        name="login"
        layout="vertical"
        // onFinish={onFinish}
        className="w-full"
        //   disabled={isLoggingIn}
      >
        <div className="flex justify-center items-center mb-4">
          <img
            src="/image/logo.png"
            alt="YourVibes"
            className="font-cursive text-black w-[60%] sm:w-[50%] md:w-[40%]"
          />
        </div>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            placeholder={"Mật khẩu"}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>
        <div className="mb-4 text-center text-xs">
          <a href="/forgotPassword" className="text-blue-500 hover:underline">
            {"Quên mật khẩu?"}
          </a>
        </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-black text-white py-8 rounded-md hover:bg-gray-800"
            //   loading={loading}
            //   disabled={isLoggingIn}
          >
            {"Đăng nhập"}
          </Button>
        <div className="text-center text-sm">
          <span>
            {"Bạn chưa có tài khoản?"}{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              {"Đăng ký"}
            </a>
          </span>
        </div>
      </Form>
      {/* </Spin> */}
    </div>
  );
};
export default Login;
