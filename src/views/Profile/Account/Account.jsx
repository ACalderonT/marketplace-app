import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Flex, Form, Input, Row, Space } from "antd";
import { useState } from "react";

const Account = () => {
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    const onReset = () => {
        console.log("form: ", form)
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log(values);
    };

    return(
        <>
            <Form
                form={form}
                layout="vertical"
                name="account-form"
                onReset={onReset}
                onFinish={onFinish}
                scrollToFirstError
            >
                <Row>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            label='Name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!'
                                }
                            ]}
                        >
                            <Input disabled={!editMode} />
                        </Form.Item>

                        <Form.Item
                            label="Lastname"
                            name="lastname"
                        >
                            <Input disabled={!editMode} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
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
                            <Input disabled={!editMode} />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
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
                            <Input disabled={!editMode} />
                        </Form.Item>

                        { 
                            editMode && 
                            <>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="confirm-password"
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
                            </>
                        }
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <Flex vertical align="center" justify="center" gap='large'>
                            <Avatar 
                                size={120}
                                icon={<AntDesignOutlined />}
                            />
                            <Form.Item>
                                <Space direction="horizontal" size='middle'>
                                    
                                    {
                                        !editMode && <Button type="primary" ghost onClick={handleEditMode}>Edit</Button>
                                    }
                                    {   
                                        editMode && 
                                            <>
                                                <Button type="link" onClick={handleEditMode}>Cancel</Button>
                                                <Button type="primary" htmlType="button" onClick={onReset} ghost>Reset</Button>
                                                <Button type="primary" htmlType="submit" >Confirm</Button>
                                            </>
                                    }
                                </Space>
                            </Form.Item>
                        </Flex>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Account;