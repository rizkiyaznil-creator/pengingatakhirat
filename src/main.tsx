import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initAuth } from './lib/useAuth'

// Inisialisasi sesi & sinkronisasi cloud (no-op bila cloud belum dikonfigurasi)
initAuth()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
