import { Button, Col, Flex, Form, Image, Input, InputNumber, Row, Select } from "antd";
import tagOptions from '../../../utils/tagOptions.json'
import { useState } from "react";
import FileImage from "./Modal/FileImage";
import { PlusOutlined } from "@ant-design/icons";

const NewPost = () => {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [imageList, setImageList] = useState([]);

    console.log("imageList: ", imageList);
    
    const onSubmit = (values) => {
        form.getFieldValue('images')
        console.log(values);
    };

    return (
        <>
            <FileImage showModal={showModal} setShowModal={setShowModal} setImageList={setImageList} form={form}  />
            <Form
                form={form}
                layout="vertical"
                name="new-post"
                onFinish={onSubmit}
                onFinishFailed={() => console.log("On Finish Filed")}
            >
                <Row gutter={[12, 12]}>
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
                            label="Tags"
                            name="tags"
                        >
                            <Select mode="multiple" options={tagOptions}/>
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
                                {
                                    imageList.map((image, index) => (
                                        <Col key={(index)} xs={12} sm={8} md={6}>
                                            <div style={{ borderRadius: '10px', overflow: 'hidden'}}>
                                                <Image src={image.url} preview={false} height={100}/>
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify='center'>
                    <Flex>
                    <Col span={24}>
                            <Button type="primary" htmlType="submit">Create Post</Button>
                    </Col>
                    </Flex>
                </Row>
            </Form>
        </>
    )
}

export default NewPost;