import { Button, Col, Divider, Form, Input, InputNumber, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import FileImage from "./Modal/FileImage";
import { PlusOutlined } from "@ant-design/icons";
import { useUser } from "../../../context/UserProvider";
import './Posts.css'
import { getAllCategories, getProductById } from "../../../services/public";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../../../services/profile";

const EditPost = () => {
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    
    const { user, token: authToken } = useUser();
    const navigate = useNavigate();
    const { id } = useParams()
    
    const formatImages = (imageArray) => {
        return '{' + imageArray.map((image) => `"${image.url}"`).join(',') + '}'
    }

    const formatImagesForEdit = (imgArray) => {
        const formattedArray = []
        imgArray.map((img) => {
            let newImg = {}
            newImg['url'] = img
            formattedArray.push(newImg)
        })

        return formattedArray
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault()
        }
    }

    const handleChange = () => {
        setIsSubmitDisabled(false)
    }

    const onSubmit = (values) => {
        const payload = values;
        payload.images = formatImages(payload.images);
        payload['creatorId'] = user.id;

        updatePost(authToken, id, payload)
        .then((result) => {
            if(result.success){
                message.success("Post updated successfully.")
                navigate("/profile/posts")
            }else{
                message.error("Something went wrong.")
            }
        })
    };

    useEffect(() => {
        setIsLoading(true)
        getProductById(id)
        .then((result) => {
            if(result.success){
                const formattedImages = formatImagesForEdit(result.data.images)
                setImageList(formattedImages)
                form.setFieldValue('productName', result.data.title);
                form.setFieldValue('description', result.data?.description);
                form.setFieldValue('brand', result.data.brand);
                form.setFieldValue('category', result.data.category_id);
                form.setFieldValue('price', result.data.price);
                form.setFieldValue('location', result.data.location);
                form.setFieldValue('images', formattedImages)
            }
        })
        .catch(error => console.error(error))
        .finally(setIsLoading(false))

        getAllCategories()
        .then((result) => {
            if(result.success){
                setCategoriesOptions(result.data)
            }
        }).catch(error => console.error(error))

    }, [])

    return (
        <>
            {!isLoading && (
                <>
                <FileImage showModal={showModal} setShowModal={setShowModal} setImageList={setImageList} form={form} isEditMode={true} setIsSubmitDisabled={setIsSubmitDisabled} />
                <Form
                    form={form}
                    layout="vertical"
                    name="new-post"
                    onFinish={onSubmit}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFinishFailed={() => message.error("Please, complete the required fields")}
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
                                                    <img src={image.url} className="post-img" />
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Row justify='center' align='middle'>
                        <Button type="link" htmlType="submit" onClick={() => navigate("/profile/posts")} >Go Back</Button>
                        <Button type="primary" htmlType="submit" disabled={isSubmitDisabled} >Confirm Changes</Button>
                    </Row>
                </Form>
                </>
            )}
        </>
    )
}

export default EditPost;