import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { Globe, RefreshCw, AlertTriangle, CheckCircle, ShieldAlert, BookOpen } from 'lucide-react'

export default function AxiosDemo() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [statusCode, setStatusCode] = useState(null)

  // Fetch users from public REST API
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    setStatusCode(null)
    try {
      // Axios automatically transforms JSON response body (no res.json() step needed)
      const response = await api.get('/users?_limit=4')
      setUsers(response.data)
      setStatusCode(response.status) // e.g. 200 OK
    } catch (err) {
      // Axios automatically rejects promises on 4xx/5xx status codes into catch block
      setError(err.message)
      if (err.response) {
        setStatusCode(err.response.status)
      }
    } finally {
      setLoading(false)
    }
  }

  // Simulate HTTP 404 error to demonstrate Axios error handling
  const trigger404Error = async () => {
    setLoading(true)
    setError(null)
    setStatusCode(null)
    try {
      // Non-existent endpoint
      await api.get('/non-existent-endpoint-404')
    } catch (err) {
      // Axios rejects the promise on any status code outside 2xx range
      setError(`Error caught by Axios: ${err.message}`)
      if (err.response) {
        setStatusCode(err.response.status) // 404
      }
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch on component mount
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
          Promise-based HTTP client for browser and Node.js. Simplifies asynchronous requests with automatic JSON data parsing and strict status error handling.
        </p>
      </div>

      <div className="grid-2">
        {/* Controls Card */}
        <div className="card">
          <h2 className="card-title">
            <RefreshCw size={20} color="#38bdf8" /> Request Operations
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            Inspect how Axios responds to successful HTTP responses (200 OK) versus server errors (404 Not Found):
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={fetchUsers} 
              disabled={loading} 
              className="btn btn-primary"
            >
              <CheckCircle size={16} /> Fetch Users (200 OK)
            </button>

            <button 
              onClick={trigger404Error} 
              disabled={loading} 
              className="btn btn-danger"
            >
              <AlertTriangle size={16} /> Simulate 404 Error
            </button>
          </div>

          {/* Status Display */}
          <div style={{ marginTop: '1.5rem', background: '#0b1120', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>HTTP Status Code:</span>
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
                ⏳ Loading asynchronous request...
              </div>
            )}

            {error && (
              <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <ShieldAlert size={16} /> {error}
              </div>
            )}
          </div>

          <div className="code-box">
            // Configured client instance in src/services/api.js:<br />
            const res = await api.get('/users?_limit=4');<br />
            setUsers(res.data); // data is already parsed as a native JavaScript object
          </div>
        </div>

        {/* Live Data Display Card */}
        <div className="card">
          <h2 className="card-title">
            <Globe size={20} color="#22c55e" /> API Response (JSONPlaceholder)
          </h2>

          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
              Fetching data from remote API...
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
              No data to display due to simulated error. Click "Fetch Users" to retry.
            </div>
          )}
        </div>
      </div>

      {/* Defense Callout */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="defense-box" style={{ marginTop: 0 }}>
          <div className="defense-box-title">
            <BookOpen size={18} /> Defense Question: "What is the fundamental difference between Axios and native fetch()?"
          </div>
          <p>
            <strong>Key Defense Answer:</strong> There are two critical differences:
            <br />
            1. <strong>Error Handling:</strong> With <code>fetch()</code>, when the server responds with a 404 Not Found or 500 Internal Server Error, the promise does NOT reject; it resolves normally and requires manual verification with <code>if (!response.ok)</code>. In contrast, <strong>Axios automatically rejects the promise</strong> on any status code outside the 2xx range, routing execution directly into the <code>catch</code> block.
            <br />
            2. <strong>Data Transformation:</strong> With <code>fetch()</code>, a two-step async sequence is required (<code>await fetch()</code> followed by <code>await res.json()</code>). Axios automatically parses the response body into JSON behind the scenes and exposes it directly via <code>response.data</code>.
          </p>
        </div>
      </div>
    </div>
  )
}
