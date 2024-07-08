import { EnvironmentOutlined, EyeOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, Tag } from "antd";
import { formatCurrency } from "../../../utils/helpers";
import BuyModal from "../BuyModal/BuyModal";
import { useState } from "react";
import PropTypes from 'prop-types';
import './ProductCard.css'



const ProductCard = ({ product }) => {
    const [favorite, setFavorite] = useState(product.favorite)
    const [showModal, setShowModal] = useState(false)

    const onFavoriteClick = () => {
        setFavorite(!favorite);
        // Agregar servicio update del registro
    }

    const handleBuyModal = () => {
        setShowModal(true)
    }

    return(
        <>
            { showModal && <BuyModal product={product} setShowModal={setShowModal}/> }
            <Card
                hoverable
                bordered={false}
                className="responsive-card"
                size="small"
                cover={
                    <Image alt={product.name}
                           src={product.img}
                           className="card-image"
                           preview={false}
                    />
                }
                actions={[
                    <Button key={`favorite_${product.id}`} type='text' icon={favorite ? <HeartFilled style={{ color: '#f5222d' }}/> : <HeartOutlined />} onClick={onFavoriteClick} />,
                    <Button key={`cart_${product.id}`} type='text' icon={<ShoppingCartOutlined />} onClick={handleBuyModal} />,
                    <Button key={`detail_${product.id}`} type='text' icon={<EyeOutlined />} />,
                ]}
            >
            <Flex vertical justify="space-between" >
                <Flex wrap>
                    { product.tags.map((tag) => (
                        <Tag key={tag} bordered={false}>{tag}</Tag>
                    ))}
                </Flex>
                <>
                    <h1 className="product-price">$ {formatCurrency(product.price)}</h1>
                    <span className="product-date">{product.date}</span>
                </>
                <>
                    <h2 className="product-name">{product.name}</h2>
                </>
                <>
                    <span><EnvironmentOutlined style={{ fontSize: '1em' }} /> {product.location}</span>
                    <span className="product-seller"><UserOutlined style={{ fontSize: '1rem'}}/> {product.user}</span>
                </>
            </Flex>
            </Card>
        </>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        date: PropTypes.string,
        location: PropTypes.string,
        user: PropTypes.string,
        img: PropTypes.string,
        tags: PropTypes.array,
        favorite: PropTypes.bool
    })
}

export default ProductCard;