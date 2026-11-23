import React from 'react'
import { Layers, ShieldCheck, Zap, Server, ArrowRight, BookOpen } from 'lucide-react'

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
            <Zap size={20} color="#38bdf8" /> What Does JAM Stand For?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <div style={{ background: '#0b1120', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
              <strong style={{ color: '#38bdf8' }}>J - JavaScript:</strong> Handles client-side interactivity, state management, and asynchronous requests to external services.
            </div>
            <div style={{ background: '#0b1120', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
              <strong style={{ color: '#a855f7' }}>A - APIs:</strong> All server-side functionality (database, authentication, payment processing) is abstracted into reusable HTTP/HTTPS microservices.
            </div>
            <div style={{ background: '#0b1120', padding: '0.85rem', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
              <strong style={{ color: '#22c55e' }}>M - Markup:</strong> Pre-rendered HTML templates compiled at build time, ready to be delivered instantly via Edge CDNs.
            </div>
          </div>

          <div className="code-box">
            // Core Jamstack Principle:<br />
            Pre-rendering (Build Time) + CDN Edge Distribution + Client APIs
          </div>
        </div>

        {/* Benefits Card */}
        <div className="card">
          <h2 className="card-title">
            <ShieldCheck size={20} color="#22c55e" /> Core Architectural Advantages
          </h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
              <div>
                <strong>Extreme Performance & Speed:</strong> Pre-compiled static assets are served from globally distributed CDN nodes close to the user; no waiting for origin web servers to query databases at runtime.
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
              <div>
                <strong>Enhanced Security:</strong> Decoupling the frontend from backend infrastructure dramatically reduces the attack surface (no direct database connections or exposed server-side execution environments).
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
              <div>
                <strong>Cost-Effective Scalability:</strong> Serving static cached assets via CDNs costs a tiny fraction of provisioning and maintaining traditional web server clusters and load balancers.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Visual Architectural Flow */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="card-title">
          <Server size={20} color="#f59e0b" /> Architectural Flow: Traditional Monolith vs. Jamstack
        </h2>

        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>❌ Traditional Monolithic Architecture (LAMP / WordPress / Server-Rendered):</h4>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            User request ➔ Web server receives request ➔ Queries database ➔ Renders HTML at runtime ➔ Sends full page response. (Slow, vulnerable, and resource-heavy).
          </p>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <h4 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>✅ Modern Jamstack Architecture:</h4>
          <div className="jamstack-flow">
            <div className="flow-step">
              <strong>1. Build Time</strong>
              <span>Pre-rendered code (Vite / Next / Astro)</span>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div className="flow-step">
              <strong>2. CDN Edge</strong>
              <span>Distributed globally via CDNs (Cloudflare / Netlify)</span>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div className="flow-step">
              <strong>3. Client (Browser)</strong>
              <span>Instantaneous HTML + JS delivery</span>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div className="flow-step">
              <strong>4. Dynamic APIs</strong>
              <span>Asynchronous queries via Axios / Fetch</span>
            </div>
          </div>
        </div>
      </div>

      {/* English Conceptual Reference & Official Citation */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="defense-box" style={{ marginTop: 0 }}>
          <div className="defense-box-title">
            <BookOpen size={18} /> Official Architecture Definition & Citation (English)
          </div>
          <p style={{ marginBottom: '0.5rem' }}>
            According to the official Jamstack community (<strong><a href="https://jamstack.org" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>jamstack.org</a></strong>):
            <em> "Jamstack is the architectural approach that decouples the web experience layer from data and business logic, improving flexibility, scalability, performance, and maintainability."</em>
          </p>
          <p>
            <strong>Key Defense Takeaway:</strong> Rather than relying on a centralized origin server running monolithic backends to render HTML on every single HTTP request, Jamstack builds static assets ahead of time (pre-rendering), serves them globally via Content Delivery Networks (CDNs), and delegates runtime dynamic features to reusable serverless APIs.
          </p>
        </div>
      </div>
    </div>
  )
}
