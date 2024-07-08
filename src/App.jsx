import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home/Home';
import Products from './views/Products/Products';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import NotFound from './views/Results/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Dashboard from './views/Profile/Profile';
import Account from './views/Profile/Account/Account';
import Posts from './views/Profile/Posts/Posts';
import NewPost from './views/Profile/Posts/NewPost';
import Favorites from './views/Profile/Favorites/Favorites';
import Chart from './views/Cart/Cart';
import { useUserContext } from './context/UserProvider';
import AppLayout from './views/AppLayout/AppLayout';
import './App.css'




function App() {

  const isAuthenticated = useUserContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />}/>
          <Route path='about' element={<NotFound />}/>
          <Route path='register' element={<Register />}/>
          <Route path='logIn' element={<Login />}/>
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
            <Route path='profile' element={<Dashboard />} >
              <Route index element={<Navigate to="account" replace />} />
              <Route path='account' element={<Account />} />
              <Route path='posts' element={<Posts />} />
              <Route path='new_post' element={<NewPost />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          <Route path='chart' element={<Chart />}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
