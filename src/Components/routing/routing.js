import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import LoginPage from '../login-page/login-page'
import MainPage from '../main-page/main-page';
import ProtectedRoutes from './protected-routes';

function Routing() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='mainpage' element={<MainPage />} />
                    <Route path='/*' element={<Navigate replace to='/' />} />
                </Route>
            </Routes>
        </Router>
    </div>
  )
}

export default Routing







