import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProviderFun } from './Authcontext/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <StrictMode>

    <AuthContextProviderFun>
    <App />
    </AuthContextProviderFun>

  </StrictMode>,
 </BrowserRouter>
)
