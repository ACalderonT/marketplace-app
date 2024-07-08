import { Button, Col, Flex, Form, Input, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import './Register.css'

const Register = () => {
    const navigate = useNavigate();

    return(
        <>
            <div className='main-section'>
                <Row align='middle' justify='center'>
                    <Flex gap={"small"} align="center" vertical>
                        <h1>Create an Account</h1>
                        <Form 
                            name='newAcount'
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={() => { console.log("On Finish"); navigate("/profile")}}
                            onFinishFailed={() => console.log("On Finish Filed")}
                        >
                            <Row gutter={8}>
                                <Col xs={24} sm={12}>
                                    <Form.Item
                                        name="name"
                                        label="Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your name!'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Form.Item 
                                        name="lastname"
                                        label="Lastname"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item 
                                name="email"
                                label="Email"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not a valid email!'
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item 
                                name="phone"
                                label="Phone Number"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                      },
                                      {
                                        pattern: new RegExp(/^[0-9\b]+$/),
                                        message: 'Please enter a valid phone number!',
                                      },
                                      {
                                        min: 10,
                                        message: 'Phone number must be at least 10 digits!',
                                      },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item 
                                name="password"
                                label="Password"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item 
                                name="confirm_password"
                                label="Confirm Password"
                                dependencies={['password']}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                          if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                          }
                                          return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' block>Create</Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Row>
            </div>
        </>
    )
}

export default Register;