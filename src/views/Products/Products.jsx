import { Col, Empty, Pagination, Row, Spin } from 'antd';
import ProductCard from './ProductCard/ProductCard';
import mockData from '../../utils/products.json'
import Filters from './Filters/Filters';
import OrderBy from './OrderBy/OrderBy';
import './Products.css'
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/public';



const Products = () => {
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllProducts()
        .then((result) => {
            
            result.data['products'].map((product) => {
                product['img'] = product.images[0]
            })

            setTotal(result.data['total'])
            setProducts(result.data['products'])
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
            setTotal(mockData.total)
            setProducts(mockData.products)
            setIsLoading(false);
        })
    }, [])

    return(
        <>
            <div className='main-section product-section'>
                <Row gutter={[0, 15]}>
                    <Col span={24}>
                        <OrderBy />
                    </Col>
                    <Col span={24}>
                        <Row gutter={[15, 20]}>
                            <Col xs={24} md={6}>
                                <Filters />
                            </Col>
                            <Col xs={24} md={18} >
                                <Row gutter={[30, 30]}>
                                    {   isLoading ? 
                                        <Spin size='large'/> :
                                    products && products.length > 0 ? 
                                            products.map(product => (
                                            <Col key={product.id} xs={{ flex: '100%' }} md={{ flex: '50%' }} lg={{ flex: '33%' }} xxl={{ flex: '25%' }}>
                                                <ProductCard product={product} />
                                            </Col>
                                            )) :
                                            <Col span={24} flex={100}>
                                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            </Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Pagination
                            align='center'
                            total={total}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            defaultPageSize={12}
                            defaultCurrent={1}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Products;