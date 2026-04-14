import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Carolina from './pages/Carolina'
import Chispa from './pages/Chispa'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/carolina" replace />} />
        <Route path="/carolina" element={<Carolina />} />
        <Route path="/chispa" element={<Chispa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
