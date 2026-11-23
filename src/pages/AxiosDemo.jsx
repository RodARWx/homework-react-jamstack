import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { Globe, RefreshCw, AlertTriangle, CheckCircle, ShieldAlert, BookOpen } from 'lucide-react'

export default function AxiosDemo() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [statusCode, setStatusCode] = useState(null)

  // Función para obtener usuarios legítimos de una API pública
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    setStatusCode(null)
    try {
      // Axios parsea automáticamente la respuesta a JSON (no requiere res.json())
      const response = await api.get('/users?_limit=4')
      setUsers(response.data)
      setStatusCode(response.status) // Ej: 200 OK
    } catch (err) {
      // Axios atrapa automáticamente códigos 4xx y 5xx en el bloque catch
      setError(err.message)
      if (err.response) {
        setStatusCode(err.response.status)
      }
    } finally {
      setLoading(false)
    }
  }

  // Función para forzar un error HTTP 404 y demostrar el manejo de errores de Axios
  const trigger404Error = async () => {
    setLoading(true)
    setError(null)
    setStatusCode(null)
    try {
      // Endpoint inexistente
      await api.get('/recurso-inexistente-404')
    } catch (err) {
      // Axios rechaza la promesa ante cualquier código fuera del rango 2xx
      setError(`Error capturado por Axios: ${err.message}`)
      if (err.response) {
        setStatusCode(err.response.status) // 404
      }
    } finally {
      setLoading(false)
    }
  }

  // Carga inicial al montar el componente
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <div className="page-header">
        <span className="badge badge-green">
          <Globe size={14} /> HTTP Client & Async Handling
        </span>
        <h1 className="page-title">Axios HTTP Client</h1>
        <p className="page-description">
          Cliente HTTP basado en <strong>Promesas</strong> para el navegador y Node.js. Facilita peticiones asíncronas con transformación automática de JSON y captura estricta de errores.
        </p>
      </div>

      <div className="grid-2">
        {/* Controls Card */}
        <div className="card">
          <h2 className="card-title">
            <RefreshCw size={20} color="#38bdf8" /> Acciones de Petición
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            Prueba cómo reacciona Axios ante una respuesta exitosa (200 OK) vs un error del servidor (404 Not Found):
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={fetchUsers} 
              disabled={loading} 
              className="btn btn-primary"
            >
              <CheckCircle size={16} /> Obtener Usuarios (200 OK)
            </button>

            <button 
              onClick={trigger404Error} 
              disabled={loading} 
              className="btn btn-danger"
            >
              <AlertTriangle size={16} /> Simular Error 404
            </button>
          </div>

          {/* Status Display */}
          <div style={{ marginTop: '1.5rem', background: '#0b1120', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Código de Estado HTTP:</span>
              {statusCode && (
                <span style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  background: statusCode === 200 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: statusCode === 200 ? '#22c55e' : '#ef4444'
                }}>
                  HTTP {statusCode}
                </span>
              )}
            </div>
            
            {loading && (
              <div style={{ color: '#38bdf8', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                ⏳ Cargando petición asíncrona...
              </div>
            )}

            {error && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <ShieldAlert size={16} /> {error}
              </div>
            )}
          </div>

          <div className="code-box">
            // Instancia configurada en src/services/api.js:<br />
            const res = await api.get('/users?_limit=4');<br />
            setUsers(res.data); // data ya está parseado como objeto JSON
          </div>
        </div>

        {/* Live Data Display Card */}
        <div className="card">
          <h2 className="card-title">
            <Globe size={20} color="#22c55e" /> Datos de la API (JSONPlaceholder)
          </h2>

          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              Descargando datos desde la API...
            </div>
          ) : users.length > 0 && !error ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {users.map((user) => (
                <div 
                  key={user.id} 
                  style={{
                    background: '#0b1120',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ color: '#f8fafc' }}>{user.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{user.email}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {user.company.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
              No hay datos para mostrar debido al error simulado. Haz clic en "Obtener Usuarios" para reintentar.
            </div>
          )}
        </div>
      </div>

      {/* Defense Callout */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="defense-box" style={{ marginTop: 0 }}>
          <div className="defense-box-title">
            <BookOpen size={18} /> Pregunta de Defensa: "¿Cuál es la diferencia fundamental entre Axios y la función nativa fetch()?"
          </div>
          <p>
            <strong>Respuesta clave:</strong> Hay dos diferencias cruciales:
            <br />
            1. <strong>Manejo de Errores:</strong> Con <code>fetch()</code>, si el servidor devuelve un error 404 o 500, la promesa NO se rechaza; se considera exitosa y requiere que revises manualmente <code>if (!response.ok)</code>. En cambio, <strong>Axios rechaza automáticamente la promesa</strong> ante cualquier status que no esté en el rango 2xx, enviando el flujo directo al bloque <code>catch</code>.
            <br />
            2. <strong>Transformación de Datos:</strong> Con <code>fetch()</code> tienes que hacer dos pasos asíncronos (<code>await fetch()</code> y luego <code>await res.json()</code>). Axios parsea el cuerpo de la respuesta a JSON en segundo plano y te lo entrega directamente en <code>response.data</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

