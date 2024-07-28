import { createContext, useContext } from "react";
import { message } from "antd";
import PropTypes from 'prop-types';

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={messageApi}>
            { contextHolder }
            { children }
        </MessageContext.Provider>
    );
};

export const useMessage = () => useContext(MessageContext);

MessageProvider.propTypes = {
    children: PropTypes.node
}