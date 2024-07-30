import { Input, Row, Form, Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../../services/profile";
import { useUser } from "../../context/UserProvider";
import { useMessage } from "../../context/MessageContext";
import { jwtDecode } from "jwt-decode";
import './Login.css'

const Login = () => {
    const currentUser = useUser();
    const message = useMessage();
    const navigate = useNavigate();

    const onFinish = (values) => {
        userLogIn(values)
        .then((result) => {

            if(result.success){
                const decodedUser = jwtDecode(result.token)
                const { id, name, lastname, email, phone, active } = decodedUser

                currentUser.setToken(result.token)
                currentUser.setUser({
                    id,
                    name,
                    lastname,
                    email,
                    phone,
                    active
                })

                message.success('Loged In Successfully!');
                navigate("/profile/account")
            }else{
                message.error('Wrong credentials!');
            }
        })
        .catch((error) => {
            console.log(error)
        })
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
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not a valid email!"
                                },
                                {
                                    required: true,
                                    message: 'Please input your email!.'
                                }
                            ]}
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