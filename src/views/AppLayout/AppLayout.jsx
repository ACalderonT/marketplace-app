import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const AppLayout = () => {
    return(
        <Layout style={{ minHeight: '100vh' }}>
            <NavBar />
            <Content style={{ padding: '25px 45px', display: 'flex', flexDirection: 'column'}}>
                <div className="main-container">
                    <Outlet />
                </div>
            </Content>
            <Footer />
        </Layout>
    )
}

export default AppLayout;