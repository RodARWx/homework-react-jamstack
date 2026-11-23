import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Cpu, Plus, Minus, RotateCcw, Trash2, CheckCircle2, Circle, BookOpen } from 'lucide-react'

/**
 * COMPONENTE A: Controlador del Contador
 * Demuestra la suscripción selectiva: Solo extrae `counter`, `increment`, etc.
 */
function CounterWidget() {
  // Selector pattern: Este componente solo se suscribe a los cambios del contador
  const counter = useStore((state) => state.counter)
  const increment = useStore((state) => state.increment)
  const decrement = useStore((state) => state.decrement)
  const resetCounter = useStore((state) => state.resetCounter)

  return (
    <div style={{ background: '#0b1120', padding: '1.25rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.75rem' }}>
        Widget 1: Contador Global
      </h3>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
        {counter}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={decrement} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem' }}>
          <Minus size={16} />
        </button>
        <button onClick={increment} className="btn btn-primary" style={{ padding: '0.5rem 0.85rem' }}>
          <Plus size={16} />
        </button>
        <button onClick={resetCounter} className="btn btn-secondary" style={{ padding: '0.5rem 0.85rem' }}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  )
}

/**
 * COMPONENTE B: Gestor de Tareas Globales
 * Comparte el mismo store sin necesidad de pasar props ni envolver en <Context.Provider>
 */
function TasksWidget() {
  const [inputText, setInputText] = useState('')
  
  // Selectores para la lista de tareas
  const tasks = useStore((state) => state.tasks)
  const addTask = useStore((state) => state.addTask)
  const toggleTask = useStore((state) => state.toggleTask)
  const removeTask = useStore((state) => state.removeTask)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    addTask(inputText.trim())
    setInputText('')
  }

  return (
    <div style={{ background: '#0b1120', padding: '1.25rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontSize: '1rem', color: '#a855f7', marginBottom: '0.75rem' }}>
        Widget 2: Lista de Tareas (Estado Global Compartido)
      </h3>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Añadir concepto para estudiar..."
          className="form-input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">
          <Plus size={16} />
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              background: '#1e293b',
              border: '1px solid #334155'
            }}
          >
            <div
              onClick={() => toggleTask(task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#64748b' : '#f8fafc',
                fontSize: '0.875rem'
              }}
            >
              {task.completed ? <CheckCircle2 size={16} color="#22c55e" /> : <Circle size={16} color="#94a3b8" />}
              {task.text}
            </div>

            <button
              onClick={() => removeTask(task.id)}
              className="btn btn-danger"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ZustandDemo() {
  return (
    <div>
      <div className="page-header">
        <span className="badge badge-purple">
          <Cpu size={14} /> Global State Management
        </span>
        <h1 className="page-title">Zustand State Store</h1>
        <p className="page-description">
          Gestor de estado global pequeño, rápido y escalable. Cero boilerplate, sin Providers molestos y con suscripción reactiva selectiva.
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 className="card-title">
            <Cpu size={20} color="#38bdf8" /> Dos Widgets, Un Solo Store
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            Ambos componentes abajo leen y modifican el mismo almacén en <code>useStore.js</code>. ¡Observa que no existe ningún <code>&lt;Provider&gt;</code> en <code>App.jsx</code>!
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CounterWidget />
            <TasksWidget />
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">
            <BookOpen size={20} color="#22c55e" /> ¿Cómo se crea el Store en Zustand?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
            A diferencia de Redux que necesita reducers, action creators, dispatch y middleware:
          </p>

          <div className="code-box">
            // 1. Creación del store (useStore.js):<br />
            import &#123; create &#125; from 'zustand'<br /><br />
            export const useStore = create((set) =&gt; (&#123;<br />
            &nbsp;&nbsp;counter: 0,<br />
            &nbsp;&nbsp;increment: () =&gt; set((state) =&gt; (&#123; counter: state.counter + 1 &#125;)),<br />
            &nbsp;&nbsp;reset: () =&gt; set(&#123; counter: 0 &#125;)<br />
            &#125;))<br /><br />
            // 2. Uso en cualquier componente sin Provider:<br />
            const count = useStore((state) =&gt; state.counter)<br />
            const inc = useStore((state) =&gt; state.increment)
          </div>

          {/* Defense Callout */}
          <div className="defense-box">
            <div className="defense-box-title">
              <BookOpen size={18} /> Pregunta de Defensa: "¿Por qué usar Zustand en vez de React Context API o Redux?"
            </div>
            <p>
              <strong>Respuesta clave:</strong> 
              <br />
              1. <strong>Frente a Redux:</strong> Zustand elimina más del 80% del código repetitivo (*boilerplate*). No requiere actions, types ni envolver la raíz en <code>&lt;Provider store=...&gt;</code>.
              <br />
              2. <strong>Frente a React Context:</strong> Context API re-renderiza a todos los consumidores cada vez que cualquier valor dentro del context cambia (a menos que se apliquen memoizaciones complejas). Zustand utiliza el <strong>patrón de selectores</strong> (ej: <code>state =&gt; state.counter</code>), lo que significa que el componente solo se vuelve a renderizar si ese valor específico cambia.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

