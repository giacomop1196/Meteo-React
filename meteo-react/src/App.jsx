import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import MeteoFooter from './components/MeteoFooter'
import MeteoNavbar from './components/MeteoNavbar'
import MeteoMainHome from './components/MeteoMainHome'
import MeteoDetail from './components/MeteoDetail'
import { useState } from 'react'

function App() {

  const [language, setLanguage] = useState('it')

  return (
    <>
      <BrowserRouter>
        {/*  NAVBAR   */}
        <MeteoNavbar onLanguageChange={setLanguage}  />
        <Routes>
          {/*  MAIN HOME   */}
          <Route path='/' element={<MeteoMainHome language={language} />} />
          {/*  DETTAGLI   */}
          <Route path='/detail/:id' element={<MeteoDetail language={language} />} />
        </Routes>
        {/*  FOOTER   */}
        <MeteoFooter />
      </BrowserRouter>
    </>
  )
}

export default App
