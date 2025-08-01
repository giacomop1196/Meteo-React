import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import MeteoFooter from './components/MeteoFooter'
import MeteoNavbar from './components/MeteoNavbar'
import MeteoMainHome from './components/MeteoMainHome'
import MeteoDetail from './components/MeteoDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <MeteoNavbar />
        <Routes>
          <Route path='/' element={<MeteoMainHome />} />
          <Route path='/detail/:id' element={<MeteoDetail />} />
        </Routes>
        <MeteoFooter />
      </BrowserRouter>
    </>
  )
}

export default App
