import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Cpu, Plus, Minus, RotateCcw, Trash2, CheckCircle2, Circle, BookOpen } from 'lucide-react'

/**
 * COMPONENT A: Counter Controller
 * Demonstrates selective subscription: Only extracts `counter`, `increment`, etc.
 */
function CounterWidget() {
  // Selector pattern: This component only subscribes to counter state updates
  const counter = useStore((state) => state.counter)
  const increment = useStore((state) => state.increment)
  const decrement = useStore((state) => state.decrement)
  const resetCounter = useStore((state) => state.resetCounter)

  return (
    <div style={{ background: '#0b1120', padding: '1.25rem', borderRadius: '8px', border: '1px solid #334155' }}>
      <h3 style={{ fontSize: '1rem', color: '#38bdf8', marginBottom: '0.75rem' }}>
        Widget 1: Global Counter
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
 * COMPONENT B: Global Tasks Manager
 * Shares the exact same store without prop drilling or wrapping in <Context.Provider>
 */
function TasksWidget() {
  const [inputText, setInputText] = useState('')
  
  // Selectors for tasks state and actions
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
        Widget 2: Task List (Shared Global State)
      </h3>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add concept to study..."
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
          Small, fast, and scalable global state manager. Zero boilerplate, no Provider wrappers, and selective reactive subscriptions.
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2 className="card-title">
            <Cpu size={20} color="#38bdf8" /> Two Independent Widgets, One Shared Store
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            Both components below read and mutate the exact same store defined in <code>useStore.js</code>. Notice that NO <code>&lt;Provider&gt;</code> wrapper exists in <code>App.jsx</code>!
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CounterWidget />
            <TasksWidget />
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">
            <BookOpen size={20} color="#22c55e" /> How is a Zustand Store Created?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
            Unlike Redux which requires reducers, action creators, dispatchers, and middleware boilerplate:
          </p>

          <div className="code-box">
            // 1. Store creation (useStore.js):<br />
            import &#123; create &#125; from 'zustand'<br /><br />
            export const useStore = create((set) =&gt; (&#123;<br />
            &nbsp;&nbsp;counter: 0,<br />
            &nbsp;&nbsp;increment: () =&gt; set((state) =&gt; (&#123; counter: state.counter + 1 &#125;)),<br />
            &nbsp;&nbsp;reset: () =&gt; set(&#123; counter: 0 &#125;)<br />
            &#125;))<br /><br />
            // 2. Direct usage in any component without a Provider:<br />
            const count = useStore((state) =&gt; state.counter)<br />
            const inc = useStore((state) =&gt; state.increment)
          </div>

          {/* Defense Callout */}
          <div className="defense-box">
            <div className="defense-box-title">
              <BookOpen size={18} /> Defense Question: "Why choose Zustand over React Context API or Redux?"
            </div>
            <p>
              <strong>Key Defense Answer:</strong> 
              <br />
              1. <strong>Versus Redux:</strong> Zustand eliminates over 80% of boilerplate code. It requires no actions, action types, or wrapping the root tree in <code>&lt;Provider store=...&gt;</code>.
              <br />
              2. <strong>Versus React Context:</strong> React Context API re-renders every consumer whenever any value inside the context updates (unless heavy manual memoization is configured). Zustand utilizes the <strong>Selector Pattern</strong> (e.g. <code>state =&gt; state.counter</code>), ensuring a component only re-renders if its specific selected slice changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
