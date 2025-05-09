import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './routes/router.jsx';
import AuthProvider from './context/AuthProvider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <Toaster/>
        <RouterProvider router={router} />
     
    </AuthProvider>
  </StrictMode>
)
