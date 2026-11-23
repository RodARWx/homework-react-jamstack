import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckSquare, AlertCircle, CheckCircle2, Flame, BookOpen } from 'lucide-react'

export default function FormDemo() {
  // Render counter to demonstrate that the component does NOT re-render on each keystroke
  const renderCounter = useRef(0)
  renderCounter.current++

  const [submittedData, setSubmittedData] = useState(null)

  /**
   * REACT HOOK FORM INITIALIZATION
   * - register: Connects each input to internal state via native DOM ref
   * - handleSubmit: Higher-order function executing validation rules before invoking onSubmit
   * - formState.errors: Real-time validation error dictionary
   * - reset: Resets form inputs and internal state
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      category: 'student',
      acceptTerms: false
    }
  })

  // Executed exclusively when ALL validation rules pass
  const onSubmit = (data) => {
    setSubmittedData(data)
  }

  return (
    <div>
      <div className="page-header">
        <span className="badge badge-purple">
          <CheckSquare size={14} /> Form Performance & Validation
        </span>
        <h1 className="page-title">React Hook Form</h1>
        <p className="page-description">
          High-performance form management leveraging <strong>uncontrolled inputs</strong> via <code>ref</code>.
        </p>
      </div>

      <div className="grid-2">
        {/* Form Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 className="card-title" style={{ margin: 0 }}>
              Interactive Registration Form
            </h2>
            {/* Visual Render Counter Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#0b1120',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              color: '#38bdf8',
              border: '1px solid #334155'
            }}>
              <Flame size={14} color="#f59e0b" />
              Component Re-renders: <strong>{renderCounter.current}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Field 1: Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: {
                    value: 3,
                    message: 'Must be at least 3 characters'
                  }
                })}
              />
              {errors.fullName && (
                <div className="error-message">
                  <AlertCircle size={14} /> {errors.fullName.message}
                </div>
              )}
            </div>

            {/* Field 2: Email Address with Regex */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                placeholder="user@example.com"
                className={`form-input ${errors.email ? 'error' : ''}`}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address format'
                  }
                })}
              />
              {errors.email && (
                <div className="error-message">
                  <AlertCircle size={14} /> {errors.email.message}
                </div>
              )}
            </div>

            {/* Field 3: Member Role */}
            <div className="form-group">
              <label className="form-label">Member Role</label>
              <select className="form-select" {...register('category')}>
                <option value="developer">Frontend Developer</option>
                <option value="architect">Jamstack Architect</option>
                <option value="qa">QA & Testing</option>
                <option value="student">Student</option>
              </select>
            </div>

            {/* Field 4: Terms Checkbox */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  {...register('acceptTerms', {
                    required: 'You must accept the terms and conditions'
                  })}
                />
                I accept the terms and understand this exercise's code
              </label>
              {errors.acceptTerms && (
                <div className="error-message">
                  <AlertCircle size={14} /> {errors.acceptTerms.message}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Submit Form
              </button>
              <button
                type="button"
                onClick={() => { reset(); setSubmittedData(null); }}
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results & Explanation Card */}
        <div className="card">
          <h2 className="card-title">
            <CheckCircle2 size={20} color="#22c55e" /> Submitted Data (Payload)
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            When you click "Submit Form", <code>handleSubmit</code> extracts values directly from DOM node references:
          </p>

          {submittedData ? (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                ✓ Data successfully validated:
              </div>
              <pre className="code-box" style={{ color: '#a855f7' }}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="code-box" style={{ color: '#64748b', fontStyle: 'italic' }}>
              // Awaiting form submission...<br />
              // Type in the inputs and watch the flame counter above:<br />
              // Component re-renders do NOT increase while typing!
            </div>
          )}
        </div>
      </div>

      {/* English Conceptual Reference & Official Citation */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="defense-box" style={{ marginTop: 0 }}>
          <div className="defense-box-title">
            <BookOpen size={18} /> Official Form Performance Definition & Citation (English)
          </div>
          <p style={{ marginBottom: '0.5rem' }}>
            According to the official React Hook Form documentation (<strong><a href="https://react-hook-form.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>react-hook-form.com</a></strong>):
            <em> "React Hook Form reduces the amount of code you need to write while eliminating unnecessary re-renders. It embraces uncontrolled components through native input ref attributes rather than controlled state."</em>
          </p>
          <p>
            <strong>Key Defense Takeaway:</strong> In traditional controlled form architectures (such as standard <code>useState</code>), every single character typed into an input triggers a component re-render. React Hook Form isolates individual input state by registering native DOM references (uncontrolled inputs via <code>ref</code>), achieving zero unnecessary re-renders during typing while managing real-time validations, error states, and submission handling effortlessly.
          </p>
        </div>
      </div>
    </div>
  )
}
