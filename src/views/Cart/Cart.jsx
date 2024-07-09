import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';
import { Button, Col, Divider, Empty, Flex, Image, Input, Row, Space } from 'antd';
import './Cart.css'
import { formatCurrency } from '../../utils/helpers';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const Chart = () => {
    const { quantity, totalPrice, setTotalPrice, setQuantity, cartProducts, setCartProducts } = useContext(CartContext);

    const calculateTotalPrice = () => {
        let totalPriceTemp = 0;

        cartProducts.map((cartProduct) => {
            totalPriceTemp += (cartProduct.price * cartProduct.qtty)
        });

        setTotalPrice(totalPriceTemp);
    }

    const handleAddProduct = (product) => {
        console.log(cartProducts)
        const productIndex = cartProducts.findIndex((cartProduct) => cartProduct.id === product.id);
        cartProducts[productIndex].qtty += 1
        setQuantity(quantity + 1);
        calculateTotalPrice();
    }

    const handleSubstractProduct = (product) => {
        const productIndex = cartProducts.findIndex((cartProduct) => cartProduct.id === product.id);
        cartProducts[productIndex].qtty -= 1;
        setQuantity(quantity - 1);
        calculateTotalPrice();

        if(cartProducts[productIndex].qtty === 0){
            const productsCart = [...cartProducts];
            productsCart.splice(productIndex, 1);
            setCartProducts(productsCart);
        }
    }

    return(
        <>
            { cartProducts.length === 0 ? (
                <Flex align='center' justify='center' style={{ flexGrow: '1' }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="You don't have any product yet" />
                </Flex>
            ) : (
            
                <Row style={{ padding: '50px' }}>
                    { cartProducts.map((product) => 
                        (
                            <Row key={product.id} align='middle' justify='center' gutter={16} >
                                <Col span={2}>
                                    <Image
                                        preview={false}
                                        alt={product.name}
                                        src={product.img}
                                    />
                                </Col>
                                <Col span={6}>
                                    <h1>{product.title}</h1>
                                </Col>
                                <Col span={6}>
                                    <h2>$ {formatCurrency(product.price)}</h2>
                                </Col>
                                <Col span={3}>
                                    <Space.Compact>
                                        <Button onClick={() => handleSubstractProduct(product)}>
                                            <MinusOutlined />
                                        </Button>
                                        <Input value={product.qtty} style={{ textAlign: 'center' }} readOnly />
                                        <Button onClick={() => handleAddProduct(product)} >
                                            <PlusOutlined />
                                        </Button>
                                    </Space.Compact>
                                </Col>
                                <Divider />
                            </Row>
                        ))
                    }
                    <Row align='middle' justify='end' style={{ flexGrow: '1' }}>
                        <Col span={8}>
                            <h1 style={{ fontWeight: '400'}}>Total: $ {formatCurrency(totalPrice)}</h1>
                        </Col>
                    </Row>
                </Row>)
            }
        </>
    )
}

export default Chart;