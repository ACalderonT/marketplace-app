import { Badge, Button, Divider, Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { MenuOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useUser } from "../../context/UserProvider";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "./NavBar.css"

const NavBar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");
    const currentUser = useUser();
    const { quantity } = useContext(CartContext);

    const items = [
        {
            key: '1',
            label: (<NavLink className={setActiveClass} to="">Home</NavLink>)
        },
        {
            key: '2',
            label: (<NavLink className={setActiveClass} to="products">Products</NavLink>)
        },
        {
            key: '3',
            label: (<NavLink className={setActiveClass} to="about">About us</NavLink>)
        },
        {
            key: '4',
            label: (<NavLink className={setActiveClass} to="chart"><Badge count={quantity} offset={[4, -4]} dot size="small" >Shopping cart</Badge></NavLink>)
        },
        {
            type: 'divider'
        },
        !currentUser.isAuthenticated && {
            key: '5',
            label: (<NavLink className={setActiveClass} to="login">Sign in</NavLink>)
        },
        !currentUser.isAuthenticated && {
            key: '6',
            label: (<NavLink className={setActiveClass} to="register">Sign up</NavLink>)
        },
        currentUser.isAuthenticated && {
            key: '7',
            label: (<NavLink className={setActiveClass} to="profile">My Account</NavLink>)
        },
    ]

    return (
        <>
            <Header className="nav-bar">
                <div className="nav-logo" >MarketPlace</div>
                <div className={`menu-options`}>
                    <NavLink className={setActiveClass} to="">Home</NavLink>
                    <NavLink className={setActiveClass} to="products">Products</NavLink>
                    <NavLink className={setActiveClass} to="about">About us</NavLink>
                    <Divider type="vertical" />
                    <NavLink className={setActiveClass} to="chart"><Badge count={quantity} dot size="small" ><ShoppingOutlined style={{ fontSize: '1.3em'}}/></Badge></NavLink>
                    { !currentUser.isAuthenticated ? (
                        <>
                            <NavLink className={setActiveClass} to="login">Sing in</NavLink>
                            <NavLink className={setActiveClass} to="register">Sing up</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className={setActiveClass} to="profile">My Account</NavLink>
                        </>
                    )
                    }
                </div>
                <Dropdown menu={{items}} className="nav-btn" placement="bottomRight" overlayStyle={{ textAlign: 'center' }} trigger='click' >
                    <Button><MenuOutlined /></Button>
                </Dropdown>
            </Header>
        </>
    )
}

export default NavBar;