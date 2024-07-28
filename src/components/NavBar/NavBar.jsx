import { Badge, Divider } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserProvider";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "./NavBar.css"

const NavBar = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");
    const { isAuthenticated } = useContext(UserContext);
    const { quantity } = useContext(CartContext);

    return (
        <>
            <Header className="nav-bar">
                <div className="nav-logo" >MarketPlace</div>
                <div className="menu-options">
                    <NavLink className={setActiveClass} to="">Home</NavLink>
                    <NavLink className={setActiveClass} to="products">Products</NavLink>
                    <NavLink className={setActiveClass} to="about">About us</NavLink>
                    <Divider type="vertical" />
                    <NavLink className={setActiveClass} to="chart"><Badge count={quantity} dot size="small" ><ShoppingOutlined style={{ fontSize: '1.3em'}}/></Badge></NavLink>
                    { !isAuthenticated ? (
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
            </Header>
        </>
    )
}

export default NavBar;