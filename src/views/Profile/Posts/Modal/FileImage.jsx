import { Button, Col, Form, Input, Modal, Row } from "antd";
import PropTypes from 'prop-types';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const FileImage = ({ showModal, setShowModal, setImageList, form }) => {

    const handleCancel = () => {
        setShowModal(false)
        const urlImages = form.getFieldValue(['images'])
        if(urlImages){
            setImageList(urlImages)
        }
    }
    
    return (
        <>
            <Modal
                title="Add the url of your images"
                open={showModal}
                onCancel={handleCancel}
                footer={null}
            >
                <Form 
                    form={form}
                    wrapperCol={24}
                >
                   <Form.List
                        name="images"
                        rules={[
                            {
                              validator: async(_, items) => {
                                if (!items || items.length < 1) {
                                  return Promise.reject(new Error('Debe haber al menos un campo.'));
                                }
                              },
                            },
                          ]}
                   >
                    {(fields, {add, remove}) => (
                        <>
                        {fields.map(({ key, name, ...resetField}) => (
                            <Row
                                key={key}
                                gutter={[12, 12]}
                                align='middle'
                                style={{ marginBottom: '25px'}}
                            >
                                <Col span={22}>
                                    <Form.Item
                                        {...resetField}
                                        name={[name, 'url']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[{
                                            required: true,
                                            whitespace: true,
                                            message: "Please input an image url or delete this field."
                                        }]}
                                        noStyle
                                    >
                                        <Input placeholder="input yout url image" value={key}/>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Col>
                            </Row>
                        ))}
                        {   fields.length < 5 &&
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add url
                                </Button>
                            </Form.Item>
                        }
                        </>
                    )}
                   </Form.List>
                </Form>
            </Modal>
        </>
    )
}

export default FileImage;

FileImage.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func, 
    setImageList: PropTypes.func,
    form: PropTypes.object
}