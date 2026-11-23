import React from 'react'
import { Layers, ShieldCheck, Zap, Server, Database, ArrowRight, BookOpen } from 'lucide-react'

export default function HomeJamstack() {
  return (
    <div>
      <div className="page-header">
        <span className="badge badge-purple">
          <Layers size={14} /> Architectural Paradigm
        </span>
        <h1 className="page-title">Jamstack Architecture</h1>
        <p className="page-description">
          Modern web development architecture based on client-side <strong>JavaScript</strong>, reusable <strong>APIs</strong>, and pre-built <strong>Markup</strong>.
        </p>
      </div>

      <div className="grid-2">
        {/* Concept Card */}
        <div className="card">
          <h2 className="card-title">
            <Zap size={20} color="#38bdf8" /> ¿Qué significa JAM?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <div style={{ background: '#0b1120', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
              <strong style={{ color: '#38bdf8' }}>J - JavaScript:</strong> Se encarga de toda la interactividad del lado del cliente y de solicitar recursos dinámicos.
            </div>
            <div style={{ background: '#0b1120', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
              <strong style={{ color: '#a855f7' }}>A - APIs:</strong> Todas las funciones del lado del servidor (autenticación, base de datos, pagos) se consumen como servicios vía HTTP/HTTPS.
            </div>
            <div style={{ background: '#0b1120', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
              <strong style={{ color: '#22c55e' }}>M - Markup:</strong> El código HTML pre-generado (durante la compilación / build time) listo para servirse de forma inmediata desde un CDN.
            </div>
          </div>

          <div className="code-box">
            // Principio clave de Jamstack:<br />
            Pre-rendering (Build Time) + CDN Edge Distribution + Client APIs
          </div>
        </div>

        {/* Benefits Card */}
        <div className="card">
          <h2 className="card-title">
            <ShieldCheck size={20} color="#22c55e" /> Ventajas Fundamentales
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
              <div>
                <strong>Velocidad y Performance Extremo:</strong> Los archivos HTML/JS ya existen compilados en servidores CDN cerca del usuario; no se espera a que un servidor web procese una base de datos para responder.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
              <div>
                <strong>Seguridad Superior:</strong> Al estar desacoplado el frontend del backend, la superficie de ataque se reduce drásticamente (no hay conexión directa a bases de datos ni servidores PHP/Node expuestos).
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
              <div>
                <strong>Escalabilidad Económica:</strong> Servir archivos estáticos cacheados en CDN cuesta una fracción mínima en comparación a mantener clusters de servidores web tradicionales.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Visual Architectural Flow */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="card-title">
          <Server size={20} color="#f59e0b" /> Flujo Arquitectónico: Tradicional vs. Jamstack
        </h2>

        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>❌ Arquitectura Monolítica Tradicional (LAMP / WordPress / Servidor Clásico):</h4>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            Petición de usuario ➔ Servidor web recibe petición ➔ Consulta Base de Datos ➔ Renderiza HTML en tiempo real ➔ Envía al usuario. (Lento, vulnerable y difícil de escalar).
          </p>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <h4 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>✅ Arquitectura Jamstack Moderna:</h4>
          <div className="jamstack-flow">
            <div className="flow-step">
              <strong>1. Build Time</strong>
              <span>Código pre-compilado (Vite / Next / Astro)</span>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div className="flow-step">
              <strong>2. CDN Edge</strong>
              <span>Distribuido en servidores globales (Netlify, Vercel)</span>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div className="flow-step">
              <strong>3. Cliente (Browser)</strong>
              <span>Carga instantánea de HTML + JS</span>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div className="flow-step">
              <strong>4. Dynamic APIs</strong>
              <span>Llamadas asíncronas con Axios / Fetch</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

