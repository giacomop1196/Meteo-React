import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import MeteoFooter from './components/MeteoFooter'
import MeteoNavbar from './components/MeteoNavbar'
import MeteoMainHome from './components/MeteoMainHome'

function App() {

  return (
    <>

      <MeteoNavbar />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MeteoMainHome/>} />
        </Routes>
      </BrowserRouter>

      <MeteoFooter />

    </>
  )
}

export default App
