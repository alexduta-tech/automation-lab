import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Render the application to the root element in the HTML file, bootstrapping the React app (do not put anything else here)
// Using StrictMode for highlighting potential problems in the application and ensuring adherence to best practices
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
