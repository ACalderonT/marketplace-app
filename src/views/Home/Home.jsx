import { Carousel, Col, Row } from 'antd';
import './Home.css'

const Home = () => {

    return(
        <>
            <div className='main-section'>
                <Carousel autoplay speed={500}>
                    <div>
                        <h3 className='contentStyle'>1</h3>
                    </div>
                    <div>
                        <h3 className='contentStyle'>2</h3>
                    </div>
                    <div>
                        <h3 className='contentStyle'>3</h3>
                    </div>
                    <div>
                        <h3 className='contentStyle'>4</h3>
                    </div>
                </Carousel>

                <Row gutter={[8, 8]} style={{ marginTop: '60px'}}>
                    <Col span={24}>
                        <h2 style={{ fontWeight: '600' }}>Categories</h2>
                    </Col>
                    <Col xs={24} sm={24} md={16}>
                        <div>
                            <h3 className='contentCategoryStyle'>1</h3>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <div>
                            <h3 className='contentCategoryStyle'>2</h3>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <div>
                            <h3 className='contentCategoryStyle'>3</h3>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={16}>
                        <div>
                            <h3 className='contentCategoryStyle'>4</h3>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home;