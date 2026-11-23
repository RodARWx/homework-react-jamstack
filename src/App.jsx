import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomeJamstack from './pages/HomeJamstack'
import RouterDemo from './pages/RouterDemo'
import FormDemo from './pages/FormDemo'
import AxiosDemo from './pages/AxiosDemo'

/**
 * APP ROOT COMPONENT
 * Configura la estructura principal y la tabla de enrutamiento con <Routes> y <Route>.
 * Cada ruta asocia una URL a un componente específico:
 * - "/" -> HomeJamstack (Arquitectura Jamstack)
 * - "/router" -> RouterDemo (React Router)
 * - "/form" -> FormDemo (React Hook Form)
 * - "/axios" -> AxiosDemo (Axios HTTP Client)
 * - "/zustand" -> ZustandDemo (Zustand State Management)
 */
export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeJamstack />} />
          <Route path="/router" element={<RouterDemo />} />
          <Route path="/form" element={<FormDemo />} />
          <Route path="/axios" element={<AxiosDemo />} />
          {/* Ruta comodín de respaldo */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

