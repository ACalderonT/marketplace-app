import { Col, Flex, Row } from 'antd';
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './About.css'
import { PlusOutlined } from '@ant-design/icons';

const About = () => {
    return(
        <>
            <div className='main-section'>
                <Flex vertical gap='large'>
                    <Row align='middle' justify='center'>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <h1>Front-End Powered By</h1>
                        </Col>
                        <Col className='logo-container' xs={24} sm={12}>
                            <Flex align='center' justify='space-around'>
                                <Flex vertical align='center'>
                                    <img className='logo' src={viteLogo} />
                                    <h3>Vite</h3>
                                </Flex>
                                <PlusOutlined />
                                <Flex vertical align='center'>
                                    <img className='logo' src={reactLogo} />
                                    <h3>React</h3>
                                </Flex>
                                <PlusOutlined />
                                <Flex vertical align='center'>
                                    <img className='logo' src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
                                    <h3>Antd</h3>
                                </Flex>
                            </Flex>
                        </Col>
                    </Row>
                    <Row align='middle' justify='center'>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <h1>Back-End Powered By</h1>
                        </Col>
                        <Col className='logo-container' xs={24} sm={12}>
                        <Flex align='center' justify='space-around'>
                                <Flex vertical align='center'>
                                    <img className='logo' src="https://www.svgrepo.com/show/303266/nodejs-icon-logo.svg" />
                                    <h3>Node JS</h3>
                                </Flex>
                                <PlusOutlined />
                                <Flex vertical align='center'>
                                    <img className='logo' src='https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg' />
                                    <h3>PostgreSQL</h3>
                                </Flex>
                            </Flex>
                        </Col>
                    </Row>
                </Flex>
            </div>
        </>
    )
}

export default About;