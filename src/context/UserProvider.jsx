import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const initialUserState = {
        name: null,
        lastname: null,
        email: null,
        phone: null,
        active: false
    }
    
    const [user, setUser] = useState(initialUserState)

    const logOut = () => {
        setUser(initialUserState)
    }
    const isAuthenticated = user.active

    return (
        <UserContext.Provider 
            value={{ 
                user, 
                isAuthenticated, 
                setUser,
                logOut
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node
}

export default UserProvider;