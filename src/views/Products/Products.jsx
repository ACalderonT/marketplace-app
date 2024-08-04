import { Col, Empty, Pagination, Row, Spin } from 'antd';
import ProductCard from './ProductCard/ProductCard';
import mockData from '../../utils/products.json'
import Filters from './Filters/Filters';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/public';
import { useFilter } from '../../context/FilterProvider';
import './Products.css'


const Products = () => {
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { filters } = useFilter();

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        setIsLoading(true)
        getAllProducts(currentPage, filters)
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
        setIsLoading(false)
    }, [currentPage]);

    return(
        <>
            <div className='main-section product-section'>
                    <Row gutter={[0, 15]}>
                        <Col span={24}>
                            <Row gutter={[45, 20]}>
                                <Col xs={24} md={6}>
                                    <Filters setCurrentPage={setCurrentPage} setTotal={setTotal} setProducts={setProducts} setIsLoading={setIsLoading} />
                                </Col>
                                <Col xs={24} md={18} style={{ padding: '15px'}}>
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
                                current={currentPage}
                                defaultPageSize={9}
                                onChange={onPageChange}
                                responsive
                            />
                        </Col>
                    </Row>
            </div>
        </>
    )
}

export default Products;