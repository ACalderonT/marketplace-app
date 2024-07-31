import { Button, Col, Divider, Flex, Row } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import './Profile.css'



const Profile = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "activeProfile" : "inactiveProfile");
    const currentUser = useUser();
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        currentUser.logOut();
        navigate("/");
    }

    return(
        <>
            <div className='main-section'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col className="gutter-row" span={4}>
                        <Flex vertical gap={'small'} className="profile-sidebar">
                            <NavLink className={setActiveClass} to="account">My account</NavLink>
                            <NavLink className={setActiveClass} to="favorites">Favorites</NavLink>
                            <NavLink className={setActiveClass} to="posts">My posts</NavLink>
                            <NavLink className={setActiveClass} to="new_post">Create post</NavLink>
                            <Divider />
                            <Button type="link" danger icon={<LogoutOutlined />} onClick={handleLogOut} size="small" >
                                Sing Out
                            </Button>
                        </Flex>
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Profile;