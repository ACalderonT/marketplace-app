import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider }  from './context/UserProvider.jsx'
import { FilterProvider } from './context/FilterProvider.jsx'
import CartProvider from './context/CartProvider.jsx'
import { MessageProvider } from './context/MessageContext.jsx'
import App from './App.jsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MessageProvider>
        <UserProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </UserProvider>
      </MessageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
