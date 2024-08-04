import { useContext } from 'react';
import { CartContext } from '../../../context/CartProvider';
import { EyeOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Tag } from "antd";
import { formatCurrency } from "../../../utils/helpers";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'




const ProductCard = ({ product }) => {
    const [favorite, setFavorite] = useState(product.favorite);
    const navigate = useNavigate();

    const {setTotalPrice, setQuantity, setCartProducts} = useContext(CartContext);

    const goToDetail = (id) => {
        navigate(`${id}`)
    }

    const onFavoriteClick = () => {
        setFavorite(!favorite);
        // Agregar servicio update del registro
    }

    const handleBuyProduct = (product) => {
        setCartProducts(prevCartProducts => {
            const productIndex = prevCartProducts.findIndex(cartProduct => cartProduct.id === product.id);
            let newCartProducts;
    
            if (productIndex < 0) {
                const addedProduct = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    img: product.img,
                    qtty: 1
                };
                newCartProducts = [...prevCartProducts, addedProduct];
            } else {
                newCartProducts = prevCartProducts.map((cartProduct, index) => 
                    index === productIndex 
                        ? { ...cartProduct, qtty: cartProduct.qtty + 1 }
                        : cartProduct
                );
            }
    
            // Calculate new total price
            const newTotalPrice = newCartProducts.reduce((total, cartProduct) => 
                total + (cartProduct.price * cartProduct.qtty), 0
            );
    
            // Update total price
            setTotalPrice(newTotalPrice);
    
            return newCartProducts;
        });
    
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    return(
        <>
            <Card
                hoverable
                bordered={false}
                className="no-pointer"
                size="small"
                cover={
                    <div className='card-img-container'>
                        <img src={product.img} alt={product.title} className='card-img'/>
                    </div>
                }
                actions={[
                    <Button key={`favorite_${product.id}`} type='text' icon={favorite ? <HeartFilled style={{ color: '#f5222d' }}/> : <HeartOutlined />} onClick={onFavoriteClick} />,
                    <Button key={`cart_${product.id}`} type='text' icon={<ShoppingCartOutlined />} onClick={() => handleBuyProduct(product)} />,
                    <Button key={`detail_${product.id}`} type='text' icon={<EyeOutlined />} onClick={() => goToDetail(product.id)} />,
                ]}
            >
                <Flex justify='space-between'>
                        <Tag color='blue' style={{ fontSize: 'xx-small'}}>{product.category}</Tag>
                        <Tag color='geekblue' style={{ fontSize: 'xx-small'}}>{product.brand}</Tag>
                </Flex>
                <Divider />
                <Flex vertical justify="space-between" >
                    <Flex vertical gap='small'>
                        <h2 className="product-name">{product.title}</h2>
                        <span>{product.description}</span>
                        <span className='product-seller'>Selled by: {product.seller}</span>
                        <h1 className="product-price">$ {formatCurrency(product.price)}</h1>
                    </Flex>
                </Flex>
            </Card>
        </>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        date: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        seller: PropTypes.string,
        img: PropTypes.string,
        category: PropTypes.string,
        brand: PropTypes.string,
        favorite: PropTypes.bool
    })
}

export default ProductCard;