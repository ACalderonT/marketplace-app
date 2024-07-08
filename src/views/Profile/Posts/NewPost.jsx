import { Button, Col, Flex, Form, Input, InputNumber, Row, Select, Upload } from "antd";
import tagOptions from '../../../utils/tagOptions.json'
import { useState } from "react";
import FileImage from "./Modal/FileImage";

const NewPost = () => {
    const [fileList, setFileList] = useState([]);
    const [showModal, setShowModal] = useState(false);

      const handleRemoveImage = (file) => {
        setFileList(fileList.filter(item => item.uid !== file.uid));
      };

      const uploadProps = {
        fileList,
        listType: 'picture-card',
        onRemove: handleRemoveImage,
        beforeUpload: () => false,
        openFileDialogOnClick: false,
        customRequest: ({ onSuccess }) => {
          onSuccess("ok");
        },
      };
    
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <>
            <FileImage showModal={showModal} setShowModal={setShowModal} fileList={fileList} setFileList={setFileList} />
            <Form
                layout="vertical"
                name="new-post"
                onFinish={onSubmit}
                onFinishFailed={() => console.log("On Finish Filed")}
            >
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            label="Product Name"
                            name="product-name"
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
                            label="Images"
                            name="images"
                        >
                            <Upload {...uploadProps} >
                                { fileList.length < 5 && <Button type="text" onClick={() => setShowModal(true)}>+ Upload</Button> }
                            </Upload>
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