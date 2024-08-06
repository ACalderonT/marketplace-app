import { createContext, useContext, useState } from "react";
import { handleDecrypt } from "../utils/helpers";
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
    
    const [user, setUser] = useState(
        localStorage.getItem("session") ? JSON.parse(handleDecrypt(localStorage.getItem("session"))) : initialUserState
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") ? localStorage.getItem("token") : null
    );

    const logOut = () => {
        setUser(initialUserState)
    }

    const isAuthenticated = user.active

    return (
        <UserContext.Provider 
            value={{ 
                user,
                setUser,
                isAuthenticated,
                token,
                setToken,
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