import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './theme.css'
import TripApp from './TripApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TripApp />
  </StrictMode>,
)
