import { Button, Card, Col, Image, Row } from "antd";
import myProducts from '../../../utils/myProducts.json'
import { EyeOutlined, HeartFilled } from "@ant-design/icons";

const Favorites = () => {
    return(
        <Row gutter={[24, 32]} wrap>
            {
                myProducts.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6} >
                        <Card
                            hoverable
                            bordered={false}
                            extra={<Button key={`favorite_${product.id}`} type='text' icon={<HeartFilled style={{ color: '#f5222d' }}/>} />}
                            actions={[
                                <Button key={`detail_${product.id}`} type='link' icon={<EyeOutlined />} />
                            ]}
                            cover={
                                <Image
                                    preview={false}
                                    alt={product.name}
                                    src={product.main_img}
                            />}
                        />
                    </Col>
                ))
            }
        </Row>
    )
}

export default Favorites;