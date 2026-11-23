import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Compass, ExternalLink, RefreshCw, BookOpen, Layers } from 'lucide-react'

export default function RouterDemo() {
  const navigate = useNavigate()
  const location = useLocation()
  const [demoId, setDemoId] = useState('101')

  return (
    <div>
      <div className="page-header">
        <span className="badge">
          <Compass size={14} /> Client-Side Routing
        </span>
        <h1 className="page-title">React Router (v7 / v6)</h1>
        <p className="page-description">
          Permite crear aplicaciones <strong>Single Page Application (SPA)</strong> donde la navegación entre vistas ocurre instantáneamente en el cliente sin recargar la página.
        </p>
      </div>

      <div className="grid-2">
        {/* Explanation Card */}
        <div className="card">
          <h2 className="card-title">
            <RefreshCw size={20} color="#38bdf8" /> ¿Cómo funciona internamente?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1rem' }}>
            En la web clásica, cada enlace <code>&lt;a href="..."&gt;</code> envía una petición HTTP al servidor, el cual devuelve un documento HTML completo provocando un parpadeo en blanco.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            React Router aprovecha la <strong>HTML5 History API</strong> (específicamente los métodos <code>window.history.pushState()</code> y el evento <code>popstate</code>):
          </p>

          <div className="code-box">
            // 1. Modifica la URL en la barra de direcciones del navegador:<br />
            window.history.pushState(state, '', '/nueva-ruta')<br /><br />
            // 2. React Router detecta el cambio de URL y monta el componente<br />
            // asociado en el árbol de React sin recargar el navegador.
          </div>
        </div>

        {/* Interactive Navigation Demo */}
        <div className="card">
          <h2 className="card-title">
            <ExternalLink size={20} color="#22c55e" /> Navegación Programática
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Usando el hook <code>useNavigate()</code> puedes redirigir al usuario tras completar una acción (como iniciar sesión o enviar un formulario):
          </p>

          <div style={{ background: '#0b1120', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Ruta actual detectada por <code>useLocation()</code>:
            </div>
            <div style={{ fontFamily: 'var(--font-code)', color: '#38bdf8', fontWeight: 600 }}>
              {location.pathname}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => navigate('/form')}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Ir a React Hook Form
              </button>
              <button
                onClick={() => navigate('/axios')}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Ir a Axios Demo
              </button>
            </div>
            <button
              onClick={() => navigate('/zustand')}
              className="btn btn-secondary"
            >
              Ir a Zustand State
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

