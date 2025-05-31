import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { GameHub } from './pages/GameHub/GameHub'
import { FeedbackSelection } from './pages/FeedbackSelection/FeedbackSelection'
import { PokerTable } from './pages/PokerTable/PokerTable'
import { RegisterUser } from './pages/RegisterUser/RegisterUser'
import { PerfilPage } from './pages/PerfilPage/PerfilPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/gamehub' element={<GameHub />} ></Route>
        <Route path='/teams' element={<FeedbackSelection />}></Route>
        <Route path='/gametable' element={<PokerTable />}></Route>
        <Route path='/register' element={<RegisterUser />}></Route>
        <Route path='/perfil' element={<PerfilPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
