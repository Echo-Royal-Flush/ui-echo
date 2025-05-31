import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { GameHub } from './pages/GameHub/GameHub'
import { TeamSelection } from './pages/TeamSelection/TeamSelection'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/gamehub' element={<GameHub />} ></Route>
        <Route path='/teams' element={<TeamSelection />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
