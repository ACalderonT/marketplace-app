import { Button, Col, Divider, Empty, Flex, Row, Space, Spin } from "antd";
import myPosts from '../../../utils/myProducts.json'
import { formatCurrency } from "../../../utils/helpers";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserPosts, removePost } from "../../../services/profile";
import { useUser } from "../../../context/UserProvider";
import { useMessage } from "../../../context/MessageContext";
import { useNavigate } from "react-router-dom";
import './Posts.css'


const Posts = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, token } = useUser();
    const message = useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        getUserPosts(user.id, token)
        .then((result) => {
            result.data.map((product) => {
                product['main_img'] = product.images[0]
            })
            setUserPosts(result.data)
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setUserPosts(myPosts)
        })
    }, [])

    const handleDelete = (productId) => {
        removePost(token, productId)
        .then((result) => {
            if(result.success){
                const updatedPosts = userPosts.filter(product => product.id != productId)
                setUserPosts(updatedPosts)
                message.success("Post deleted successfully");
            }else{
                message.error("Something went wrong");
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return(
        <Row gutter={16} align='middle' justify='center'>
            {  isLoading ? 
                <Spin size="large"/> : 
                userPosts.length > 0 ?
                    userPosts.map((product) => (
                        <Row key={product.id} gutter={16} align='middle'>
                            <Col span={4}>
                                <div className="img-container">
                                    <img alt={product.name} src={product.main_img} className="post-img" />
                                </div>
                            </Col>
                            <Col span={16}>
                                <h1 style={{ fontWeight: '400' }}>{product.title}</h1>
                                <h2 style={{ fontSize: 'xx-large' }}>$ {formatCurrency(product.price) }</h2>
                            </Col>
                            <Col span={4}>
                                <Flex justify="center">
                                    <Space>
                                        <Button onClick={() => navigate(`edit/${product.id}`)} shape="circle" icon={<EditOutlined />} />
                                        <Button onClick={() => handleDelete(product.id)} shape="circle" icon={<DeleteOutlined />} danger />
                                    </Space>
                                </Flex>
                            </Col>
                            <Divider />
                        </Row>
                    )) :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
        </Row>
    )
}

export default Posts;