import { Input, Row, Form, Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useHandleToggleLogin } from "../../context/UserProvider";
import './Login.css'


const Login = () => {
    const navigate = useNavigate();
    const handleLogin = useHandleToggleLogin();

    const onFinish = (values) => {
        console.log(values);
        handleLogin()
        navigate('/profile');
        // Add service to connect with backend
    };

    return(
        <>
            <Row className="login-form" align='middle' justify='center'>
                <Col>
                    <Form
                        layout="vertical"
                        name="login"
                        onFinish={onFinish}
                    >
                        <h1>Welcome to MarketPlace</h1>

                        <Form.Item 
                            label="Username"
                            name="username"
                            rules={[{
                                required: true,
                                message: 'Please inputyour username!.'
                            }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: "Please input your password!."
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Flex align="middle" justify="center" vertical>
                                <Button type="primary" htmlType="submit" block>Sign in</Button>
                                <span className="span-form">or</span>
                                <Button type="link" onClick={() => navigate('/register')}>create an account!</Button>
                            </Flex>
                        </Form.Item>
                    </Form>        
                </Col>
            </Row>
        </>
    )
}

export default Login;