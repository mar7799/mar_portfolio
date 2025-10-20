import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'            // or ./Portfolio.jsx
import './index.css'                   // <-- THIS is critical

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
