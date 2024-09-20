import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Authentication from './pages/Authentication/Authentication'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='home' element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App
