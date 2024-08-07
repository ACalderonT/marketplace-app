import { Button, Col, Divider, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import { useEffect, useState } from "react";
import FileImage from "./Modal/FileImage";
import { PlusOutlined } from "@ant-design/icons";
import { createNewPost } from "../../../services/profile";
import { useMessage } from "../../../context/MessageContext";
import { useUser } from "../../../context/UserProvider";
import './Posts.css'
import { getAllCategories } from "../../../services/public";

const NewPost = () => {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const { user, token: authToken } = useUser();
    const message = useMessage();
    
    const formatImages = (imageArray) => {
        return '{' + imageArray.map((image) => `"${image.url}"`).join(',') + '}'
    }

    const onSubmit = (values) => {
        const payload = values;
        payload.images = formatImages(payload.images)
        payload['creatorId'] = user.id;

        createNewPost(authToken, payload)
        .then((result) => {
            if(result.success){
                message.success('Post created successfully!');
                form.resetFields();
                setImageList([])
            }else{
                message.error('somthing went wrong')
            }
        }).catch((error) => {
            console.log(error)
        })
    };

    useEffect(() => {
        getAllCategories()
        .then((result) => {
            setCategoriesOptions(result.data)
        }).catch(error => console.error(error))
    }, [])

    return (
        <>
            <FileImage showModal={showModal} setShowModal={setShowModal} setImageList={setImageList} form={form} isEditMode={false} />
            <Form
                form={form}
                layout="vertical"
                name="new-post"
                onFinish={onSubmit}
                onFinishFailed={() => { console.log(form.getFieldError()) }}
                scrollToFirstError
            >
                <Row gutter={[30, 12]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            label="Product Name"
                            name="productName"
                            rules={[{
                                required: true,
                                message: 'Please input the product name.'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Brand"
                            name="brand"
                            rules={[{
                                required: true,
                                message: 'Please input the product brand.'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[{
                                required: true,
                                message: 'Please select the category of the product.'
                            }]}
                        >
                            <Select options={categoriesOptions}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{
                                required: true,
                                message: 'Please input the product price.'
                            }]}
                        >
                            <InputNumber min={0} controls={false} style={{ width: '100%' }}/>
                        </Form.Item>
                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[{
                                required: true,
                                message: 'Please input the location.'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Images"
                            name="images"
                        >
                            <Row gutter={[10, 25]}>
                                <Col span={24}>
                                    <Button onClick={() => setShowModal(true)} type="dashed" block icon={<PlusOutlined />} size="large" >
                                        Upload
                                    </Button>
                                </Col>
                                {   imageList.length > 0 &&
                                    imageList.map((image, index) => (
                                        <Col key={(index)} xs={24} sm={12} md={8}>
                                            <div className="img-container">
                                                <img src={image?.url} className="post-img" />
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row justify='center'>
                    <Flex>
                        <Col span={12}>
                            <Button type="primary" htmlType="reset" onClick={() => setImageList([])} ghost>Reset</Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" htmlType="submit">Create Post</Button>
                        </Col>
                    </Flex>
                </Row>
            </Form>
        </>
    )
}

export default NewPost;