import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Chatpageone from './components/Chatpageone.jsx';
import { ChatProvider } from './context/ChatContext.jsx';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
        <Toaster position="top-center" />
      <ChatProvider>

      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/chat' element={<Chatpageone />}/>
      </Routes>
      </ChatProvider>
    </BrowserRouter>
     
  
)
