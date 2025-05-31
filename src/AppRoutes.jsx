import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { AdminTeams } from './pages/AdminTeams/AdminTeams'
import { GameHub } from './pages/GameHub/GameHub'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/gamehub' element={<GameHub />} ></Route>
        <Route path='/teams' element={<AdminTeams />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
