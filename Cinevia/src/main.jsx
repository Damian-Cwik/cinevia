import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import App from './App.jsx'
import AuthForm from './components/AuthForm/AuthForm.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<AuthForm />} />
    </Routes>
  </BrowserRouter>

)