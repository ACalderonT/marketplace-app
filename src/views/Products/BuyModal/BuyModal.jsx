import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Modal, Row, Col, Flex, Space, Button, InputNumber, Image } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatCurrency } from '../../../utils/helpers';

const BuyModal = ({ product, setShowModal }) => {

    const [count, setCount] = useState(1);

    const handleOk = () => {
        console.log("Ok")
    }

    const handleCancel = () => {
        console.log("Cancel")
        setShowModal(false)
    }

    return(
        <>
            <Modal
                open={true}
                title={"Producto añadido correctamente"}
                icon={<ShoppingCartOutlined />}
                onOk={handleOk}
                okText="Ir al carrito"
                onCancel={handleCancel}
                cancelText="seguir comprando"
                cancelButtonProps={{ type: 'link' }}
                width={'45%'}
            >
                <Flex vertical gap={'middle'} style={{ padding: '10px' }}>
                    <Row align='middle' justify='center' gutter={4}>
                        <Col span={4}>
                            <Image 
                                preview={false}
                                alt={product.name}
                                src={product.img}
                            />
                        </Col>
                        <Col span={14}>
                            <Space direction='vertical' >
                                <h1 style={{ marginBottom: '0' }}>{product.name}</h1>
                                <p style={{ margin: '0' }}>{product.description}</p>
                            </Space>
                        </Col>
                        <Col span={6}>
                            <Flex justify='center'>
                                <Space.Compact>
                                    <Button
                                        size='small' 
                                        disabled={count === 0}
                                        onClick={() => setCount(count - 1)}
                                    >
                                        <MinusOutlined />
                                    </Button>
                                    <InputNumber
                                        readOnly
                                        size='small'
                                        min={0}
                                        controls={false}
                                        defaultValue={1}
                                        value={count}
                                        style={{ width: '2.5em', textAlign: 'center' }}
                                        onChange={(value) => { setCount(value); console.log(value) }}
                                        onStep={(value) => { setCount(value); console.log(value)}}
                                    />
                                    <Button
                                        size='small'
                                        onClick={() => setCount(count + 1)}
                                    >
                                        <PlusOutlined />
                                    </Button>
                                </Space.Compact>
                            </Flex>
                        </Col>
                    </Row>
                    <Row justify='end' style={{ textAlign: 'right'}}>
                        <Col span={24}>
                            <Space>
                                <h2>Total: </h2>
                                <h2 style={{ fontWeight: '500' }}>$ {formatCurrency(product.price * count)}</h2>
                            </Space>
                        </Col>
                    </Row>
                </Flex>
            </Modal> 
        </>
    )
}

BuyModal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        date: PropTypes.string,
        location: PropTypes.string,
        user: PropTypes.string,
        img: PropTypes.string,
        tags: PropTypes.array,
        favorite: PropTypes.bool
    }),
    setShowModal: PropTypes.func
}

export default BuyModal;