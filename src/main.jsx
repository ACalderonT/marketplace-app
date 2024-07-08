import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserProvider.jsx'
import App from './App.jsx'
import './index.css'
import { FilterProvider } from './context/FilterProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
