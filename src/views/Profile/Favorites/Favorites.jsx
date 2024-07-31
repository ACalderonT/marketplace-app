import { Button, Card, Col, Empty, Image, Row, Spin } from "antd";
import myProducts from '../../../utils/myProducts.json'
import { EyeOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserProvider";
// import { useMessage } from "../../../context/MessageContext";
import { getFavoriteUserPosts } from "../../../services/profile";

const Favorites = () => {
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, token } = useUser();
    // const message = useMessage();

    useEffect(() => {
        getFavoriteUserPosts(user.id, token)
        .then((result) => {
            console.log(result);
            setFavoritePosts(result.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setFavoritePosts(myProducts);
        })

        console.log(favoritePosts);
    }, [])

    return(
        <Row gutter={[24, 32]} align='middle' justify='center' wrap>
            {   isLoading ? 
                <Spin size="large" /> :
                favoritePosts.length > 0 ? 
                    favoritePosts.map((product) => (
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
                    )) :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </Row>
    )
}

export default Favorites;