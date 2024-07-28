import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
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

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
    children: PropTypes.node
}