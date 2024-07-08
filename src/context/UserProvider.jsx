import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const userContext = createContext();
const handleToggleLoginContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}

export const useHandleToggleLogin = () => {
    return useContext(handleToggleLoginContext)
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    const handleLogin = () => { 
        setUser(!user);
    }

    return (
        <userContext.Provider value={user} >
            <handleToggleLoginContext.Provider value={handleLogin} >
                { children }
            </handleToggleLoginContext.Provider>
        </userContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node
}