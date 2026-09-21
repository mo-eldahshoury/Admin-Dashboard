import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";

function Login({ onLogin }) {
    const [loading, setLoading] = useState(false);

    const handleFinish = (values) => {
        setLoading(true);

        const customUser = "admin";
        const customPass = "123456";

        setTimeout(() => {
            if (values.username === customUser && values.password === customPass) {
                message.success("Logged in successfully!");
                localStorage.setItem("token", "my-custom-secret-token");
                onLogin(true);
            } else {
                message.error("Invalid username or password!");
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
            <Card title="Login to Dashboard" style={{ width: 400 }}>
                <Form name="login" onFinish={handleFinish} layout="vertical">
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;