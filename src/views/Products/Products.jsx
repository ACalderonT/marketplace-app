import { Col, Pagination, Row, Space } from 'antd';
import ProductCard from './ProductCard/ProductCard';
import mockData from '../../utils/products.json'
import Filters from './Filters/Filters';
import './Products.css'
import OrderBy from './OrderBy/OrderBy';



const Products = () => {
    const { total, products } = mockData;
    return(
        <>
            <div className='main-section product-section'>
                <Row style={{ marginBottom: '15px' }}>
                    <OrderBy />
                </Row>
                <Space direction={'vertical'} size={50}>
                    <Row gutter={[32, 64]}>
                        <Col xs={24} md={6}>
                            <Filters />
                        </Col>
                        <Col xs={24} md={18} >
                            <Row gutter={[16, 32]} justify={"flex-start"}>
                                {   products.map(product => (
                                    <Col key={product.id} className="gutter-row" xs={24} sm={12} md={8}>
                                        <ProductCard product={product} />
                                    </Col>
                                ))
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row justify={'center'}>
                        <Col xs={24} md={18} >
                            <Pagination
                                align='center'
                                total={total}
                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                defaultPageSize={12}
                                defaultCurrent={1}
                            />
                        </Col>
                    </Row>
                </Space>
            </div>
        </>
    )
}

export default Products;