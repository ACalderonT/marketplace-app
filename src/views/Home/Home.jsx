import { Card, Carousel } from 'antd';
import { useFilter } from '../../context/FilterProvider';
import { useNavigate } from 'react-router-dom';
import './Home.css'



const Home = () => {
    const filters = useFilter();
    const navigate = useNavigate()

    const handleClick = (categoryApplied) => {
        filters.setFilter('categories', [categoryApplied])
        navigate("/products")
    }

    return(
        <>
            <Carousel autoplay={true} speed={300} >
                    <div className='contentStyle2'>
                        <img  src='https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
                    </div>
                    <div className='contentStyle2'>
                        <img src='https://images.pexels.com/photos/1983038/pexels-photo-1983038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
                    </div>
                    <div className='contentStyle2'>
                        <img src='https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
                    </div>
                    <div className='contentStyle2'>
                        <img src='https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
                    </div>
            </Carousel>

            <Card style={{ border: 'none', fontSize: 'x-large', cursor: 'pointer', textAlign: 'center' }}>
                <Card.Grid className='hover-color' style={{ width: '50%' }} onClick={() => handleClick(1)}>Phones</Card.Grid>
                <Card.Grid className='hover-color' style={{ width: '50%' }} onClick={() => handleClick(3)}>Laptops</Card.Grid>
                <Card.Grid className='hover-color' style={{ width: '50%' }} onClick={() => handleClick(2)}>Cameras</Card.Grid>
                <Card.Grid className='hover-color' style={{ width: '50%' }} onClick={() => handleClick(4)}>Headphones</Card.Grid>
            </Card>
        </>
    )
}

export default Home;