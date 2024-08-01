import { Badge, Button, Divider } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { MenuOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useUser } from "../../context/UserProvider";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import "./NavBar.css"

const NavBar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");
    const currentUser = useUser();
    const { quantity } = useContext(CartContext);
    const [showMenu, setShowMenu] = useState(true);

    return (
        <>
            <Header className="nav-bar">
                <div className="nav-logo" >MarketPlace</div>
                <div className={`menu-options ${showMenu ? 'show' : 'hidden'}`}>
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
                <Button className="nav-btn" icon={<MenuOutlined />} onClick={() => setShowMenu(!showMenu)} />
            </Header>
        </>
    )
}

export default NavBar;