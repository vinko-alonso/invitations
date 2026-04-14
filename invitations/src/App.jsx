import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Carolina from './pages/Carolina'
import Chispa from './pages/Chispa'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/carolina" element={<Carolina />} />
        <Route path="/chispa" element={<Chispa />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
