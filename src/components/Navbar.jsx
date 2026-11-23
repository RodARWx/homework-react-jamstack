import React from 'react'
import { NavLink } from 'react-router-dom'
import { Layers, Compass, CheckSquare, Globe, Cpu } from 'lucide-react'
import { useStore } from '../store/useStore'

/**
 * NAVBAR COMPONENT
 * Utiliza <NavLink> de 'react-router-dom'.
 * A diferencia de <a> tradicional (que recarga toda la página desde el servidor),
 * <NavLink> intercepta el evento de clic y actualiza la URL en el navegador
 * mediante la History API, permitiendo una experiencia SPA (Single Page Application).
 * Además, la función isActive nos permite aplicar estilos automáticamente a la ruta activa.
 */
export default function Navbar() {
  const counter = useStore((state) => state.counter)

  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <NavLink to="/" className="nav-brand">
          <Layers size={22} color="#38bdf8" />
          <div>React <span>Ecosystem Lab</span></div>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              end
            >
              <Layers size={16} />
              Jamstack
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/router" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <Compass size={16} />
              Router
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/form" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <CheckSquare size={16} />
              Hook Form
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/axios" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <Globe size={16} />
              Axios
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/zustand" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <Cpu size={16} />
              Zustand
              <span
                style={{
                  marginLeft: '0.25rem',
                  padding: '0.05rem 0.45rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(168, 85, 247, 0.2)',
                  color: '#c084fc',
                }}
                title="Contador global desde Zustand (useStore)"
              >
                {counter}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

