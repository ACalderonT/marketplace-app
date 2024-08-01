import { Button, Col, Divider, Empty, Flex, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/helpers";
import { CalendarOutlined, EnvironmentOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { getProductById } from "../../../services/public";
import { useParams } from "react-router-dom";
import './Detail.css'

const Detail = () => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams()

    const handleSelectedImage = (url) => {
        setSelectedImage(url);
    }

    useEffect(() => {
        getProductById(id)
        .then((result) => {
            if(result.success){
                setProduct(result.data)
                setSelectedImage(result.data.images[0])
            }
        })
        .catch((result) => {
            console.error("error: ", result)
        })
        setIsLoading(false);
    }, [])

    return (
        <>
            <div className='main-section'>
                { isLoading ? (
                        <Flex flex={1} vertical >
                            <Spin size="large"/> 
                        </Flex>
                    ) : product ? (
                        <Row gutter={[20, 50]}>
                            <Col xs={24} md={4}>
                                <Flex flex={1} className="left-sidebar">
                                    { product['images'].map((url, index) => (
                                        <div className="image-container side-img" key={index} onClick={() => handleSelectedImage(url) }>
                                            <img src={url} />
                                        </div>
                                        ))
                                    }
                                </Flex>
                            </Col>
                            <Col xs={24} md={16}>
                                    <Flex flex={1} align="center" justify="center" vertical >
                                        <div className="image-container main-img">
                                            <img src={selectedImage} />
                                        </div>
                                    </Flex>
                                    <Flex flex={1} justify="center" vertical >
                                        <h1 style={{ fontWeight: '400' }}>{product.title}</h1>
                                        <h2>Description</h2>
                                        <p>{product.description}</p>
                                    </Flex>
                            </Col>
                            <Col xs={24} md={4}>
                                    <Flex flex={1} align="center" justify="center" gap='small' vertical>
                                        <h1 style={{ fontWeight: '400', fontSize: 'xx-large' }}>$ {formatCurrency(product.price)}</h1>
                                        <Divider  />
                                            <div>
                                                <p><UserOutlined /> {product.seller}</p>
                                                <p><CalendarOutlined /> {product.date}</p>
                                                <p><EnvironmentOutlined /> {product.location}</p>
                                            </div>
                                        <Divider />
                                        <Button type="primary" block>
                                            Buy
                                        </Button>
                                        <Button type="primary" icon={<ShoppingOutlined />} block ghost>
                                            Add to Chart
                                        </Button>
                                        <Button block>
                                            Contact seller
                                        </Button>
                                    </Flex>
                            </Col>
                        </Row> 
                    ) : ( 
                        <Flex flex={1} align="center" vertical >
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Flex>
                    )
                }
            </div>
        </>
    )   
}

export default Detail;