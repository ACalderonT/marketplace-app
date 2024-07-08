import { Button, Col, Divider, Flex, Image, Row, Space } from "antd";
import myPosts from '../../../utils/myProducts.json'
import { formatCurrency } from "../../../utils/helpers";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Posts = () => {
    return(
        <Row gutter={16} align='middle' justify='center'>
            {   myPosts.map((product) => (
                    <Row key={product.id} gutter={16}>
                        <Col span={4}>
                            <Image 
                                alt={product.name}
                                src={product.main_img}
                            />
                        </Col>
                        <Col span={16}>
                            <Space >
                                <h1>[ {product.id} ] - </h1>
                                <h1 style={{ fontWeight: '400' }}>{product.title}</h1>
                            </Space>
                            <h2 style={{ fontSize: 'xx-large' }}>$ {formatCurrency(product.price) }</h2>
                        </Col>
                        <Col span={4}>
                            <Flex justify="center">
                                <Space>
                                    <Button shape="circle" icon={<EditOutlined />} />
                                    <Button shape="circle" icon={<DeleteOutlined />} danger/>
                                </Space>
                            </Flex>
                        </Col>
                        <Divider />
                    </Row>
                ))
            }
        </Row>
    )
}

export default Posts;