import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Flex, Form, Input, message, Row, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserProvider";
import { getUser, updateUserInformation } from "../../../services/profile";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const currentUser = useUser();
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log(values);
        setIsLoading(true)
        console.log(currentUser)
        updateUserInformation(currentUser.user.id, currentUser.token, values)
        .then((result) => {
            if(result.success){
                message.success("User updated successfully.")
                setEditMode(false)
                currentUser.logOut()
                navigate("/")
            }else{
                message.error("Something went wrong.")
            }
        })
        .catch(error => console.error(error))
        .finally(setIsLoading(false))
    };

    useEffect(() => {
        setIsLoading(true)
        getUser(currentUser.token)
        .then((result) => {
            
            if(!result.data['success']){
                navigate("/");
                currentUser.logOut()
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(setIsLoading(false))
    })

    const handleLogOut = () => {
        currentUser.logOut();
        localStorage.clear();
        navigate("/");
    }

    return(
        <>  
            {   isLoading ? (
                    <Row gutter={16} align='middle' justify='center'>
                        <Spin size="large"/>
                    </Row>
                ) : ( 
                    <Form
                    form={form}
                    layout="vertical"
                    name="account-form"
                    onReset={onReset}
                    onFinish={onFinish}
                    scrollToFirstError
                    requiredMark={editMode}
                    initialValues={{
                        name: currentUser.user['name'],
                        lastname: currentUser.user['lastname'],
                        email: currentUser.user['email'],
                        phone: currentUser.user['phone']

                    }}
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
                            >
                                <Input disabled />
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
                                    size={{
                                        xs: 120,
                                        sm: 200,
                                        md: 220,
                                        lg: 240,
                                        xl: 240,
                                        xxl: 340
                                    }}
                                    icon={<AntDesignOutlined />}
                                />
                                <Form.Item>
                                    <Space direction="horizontal" size='middle'>
                                        
                                        {
                                            !editMode && 
                                            <>
                                                <Button type="primary" onClick={handleLogOut} danger ghost>Sing Out</Button>
                                                <Button type="primary" ghost onClick={handleEditMode}>Edit</Button>
                                            </>
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
                )
            }
        </>
    )
}

export default Account;