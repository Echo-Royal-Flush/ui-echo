import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage/LoginPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='' element >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
