import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Compass, ExternalLink, RefreshCw, BookOpen } from 'lucide-react'

export default function RouterDemo() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <div className="page-header">
        <span className="badge">
          <Compass size={14} /> Client-Side Routing
        </span>
        <h1 className="page-title">React Router (v7 / v6)</h1>
        <p className="page-description">
          Enables modern <strong>Single Page Application (SPA)</strong> routing where navigation between views occurs instantaneously on the client without a full page refresh.
        </p>
      </div>

      <div className="grid-2">
        {/* Explanation Card */}
        <div className="card">
          <h2 className="card-title">
            <RefreshCw size={20} color="#38bdf8" /> How Does Client-Side Routing Work?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1rem' }}>
            In traditional multi-page web architectures, clicking an <code>&lt;a href="..."&gt;</code> link sends a new HTTP GET request to the origin server, returning an entirely new HTML document and causing a white flash/full reload.
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
            React Router leverages the <strong>HTML5 History API</strong> (specifically <code>window.history.pushState()</code> and the <code>popstate</code> event listener):
          </p>

          <div className="code-box">
            // 1. Updates the URL in the browser address bar without reloading:<br />
            window.history.pushState(state, '', '/new-route')<br /><br />
            // 2. React Router detects the URL change and mounts the associated<br />
            // view component dynamically into the React tree.
          </div>
        </div>

        {/* Interactive Navigation Demo */}
        <div className="card">
          <h2 className="card-title">
            <ExternalLink size={20} color="#22c55e" /> Programmatic Navigation
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Using the <code>useNavigate()</code> hook you can redirect users programmatically after completing an action (such as submitting a form or authentication):
          </p>

          <div style={{ background: '#0b1120', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Current path detected by <code>useLocation()</code>:
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
                Go to React Hook Form
              </button>
              <button
                onClick={() => navigate('/axios')}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Go to Axios Demo
              </button>
            </div>
            <button
              onClick={() => navigate('/zustand')}
              className="btn btn-secondary"
            >
              Go to Zustand State
            </button>
          </div>
        </div>
      </div>

      {/* English Conceptual Reference & Official Citation */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="defense-box" style={{ marginTop: 0 }}>
          <div className="defense-box-title">
            <BookOpen size={18} /> Official Routing Paradigm & Citation (English)
          </div>
          <p style={{ marginBottom: '0.5rem' }}>
            According to the official React Router documentation (<strong><a href="https://reactrouter.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>reactrouter.com</a></strong>):
            <em> "React Router enables client-side routing, allowing your app to update the URL and view without requesting an entire new document from the web server."</em>
          </p>
          <p>
            <strong>Key Defense Takeaway:</strong> Client-side routing intercepts browser navigation events through HTML5's <code>history.pushState()</code> and <code>popstate</code> listeners. Instead of an expensive full-page reload, React Router reconciles and mounts components dynamically in the Virtual DOM, creating instantaneous SPA transitions while preserving application state.
          </p>
        </div>
      </div>
    </div>
  )
}
