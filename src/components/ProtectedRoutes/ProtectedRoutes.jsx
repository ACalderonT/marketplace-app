import { Outlet } from 'react-router-dom';
import Unauthorized from '../../views/Results/Unauthorized';
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ isAuthenticated, children }) => {
    if(!isAuthenticated) {
        return <Unauthorized />
    }

    return children ? children : <Outlet />
}

ProtectedRoutes.propTypes = {
    isAuthenticated: PropTypes.bool,
    children: PropTypes.node
}

export default ProtectedRoutes;