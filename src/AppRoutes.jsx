import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { GameHub } from './pages/GameHub/GameHub'
import { FeedbackSelection } from './pages/FeedbackSelection/FeedbackSelection'
import { PokerTable } from './pages/PokerTable/PokerTable'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/gamehub' element={<GameHub />} ></Route>
        <Route path='/teams' element={<FeedbackSelection />}></Route>
        <Route path='/gametable' element={<PokerTable />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
