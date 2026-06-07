import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index'
import { AppRoutes } from './routes/AppRoutes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
