import { Col, Row } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import './Profile.css'



const Profile = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "activeProfile" : "inactiveProfile");

    return(
        <>
            <div className='main-section'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col xs={24} md={5}>
                        <div className="profile-sidebar">
                            <NavLink className={setActiveClass} to="account">My account</NavLink>
                            <NavLink className={setActiveClass} to="favorites">Favorites</NavLink>
                            <NavLink className={setActiveClass} to="posts">My posts</NavLink>
                            <NavLink className={setActiveClass} to="new_post">Create post</NavLink>
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} md={19}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Profile;