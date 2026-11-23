import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckSquare, AlertCircle, CheckCircle2, Flame, BookOpen } from 'lucide-react'

export default function FormDemo() {
  // Contador de re-renders para DEMOSTRAR al profesor que el componente NO se re-renderiza con cada tecla
  const renderCounter = useRef(0)
  renderCounter.current++

  const [submittedData, setSubmittedData] = useState(null)

  /**
   * INICIALIZACIÓN DE REACT HOOK FORM
   * - register: Función que conecta cada input al estado interno de la librería mediante ref
   * - handleSubmit: Función de orden superior que ejecuta las validaciones antes de invocar onSubmit
   * - formState.errors: Objeto con los errores de validación en tiempo real
   * - reset: Limpia el formulario
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      category: 'student',
      acceptTerms: false
    }
  })

  // Función ejecutada únicamente cuando TODAS las validaciones son exitosas
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
          Gestión de formularios de alto rendimiento basada en <strong>inputs no controlados</strong> mediante <code>ref</code>.
        </p>
      </div>

      <div className="grid-2">
        {/* Form Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 className="card-title" style={{ margin: 0 }}>
              Formulario de Registro
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
              Re-renders del componente: <strong>{renderCounter.current}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo 1: Nombre Completo */}
            <div className="form-group">
              <label className="form-label">Nombre Completo *</label>
              <input
                type="text"
                placeholder="Ej: Juan Pérez"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                {...register('fullName', {
                  required: 'El nombre completo es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'Debe tener al menos 3 caracteres'
                  }
                })}
              />
              {errors.fullName && (
                <div className="error-message">
                  <AlertCircle size={14} /> {errors.fullName.message}
                </div>
              )}
            </div>

            {/* Campo 2: Correo Electrónico con Regex */}
            <div className="form-group">
              <label className="form-label">Correo Electrónico *</label>
              <input
                type="email"
                placeholder="usuario@ejemplo.com"
                className={`form-input ${errors.email ? 'error' : ''}`}
                {...register('email', {
                  required: 'El correo electrónico es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Formato de correo inválido'
                  }
                })}
              />
              {errors.email && (
                <div className="error-message">
                  <AlertCircle size={14} /> {errors.email.message}
                </div>
              )}
            </div>

            {/* Campo 3: Rol / Categoría */}
            <div className="form-group">
              <label className="form-label">Rol del Integrante</label>
              <select className="form-select" {...register('category')}>
                <option value="developer">Frontend Developer</option>
                <option value="architect">Jamstack Architect</option>
                <option value="qa">QA & Testing</option>
                <option value="student">Estudiante</option>
              </select>
            </div>

            {/* Campo 4: Checkbox de términos */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  {...register('acceptTerms', {
                    required: 'Debes aceptar los términos y condiciones'
                  })}
                />
                Acepto los términos y comprendo el código de este ejercicio
              </label>
              {errors.acceptTerms && (
                <div className="error-message">
                  <AlertCircle size={14} /> {errors.acceptTerms.message}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Enviar Formulario
              </button>
              <button
                type="button"
                onClick={() => { reset(); setSubmittedData(null); }}
                className="btn btn-secondary"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* Results & Explanation Card */}
        <div className="card">
          <h2 className="card-title">
            <CheckCircle2 size={20} color="#22c55e" /> Datos Recibidos (Submit)
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            Cuando presionas "Enviar Formulario", <code>handleSubmit</code> recopila los valores directamente de las referencias DOM:
          </p>

          {submittedData ? (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                ✓ Datos validados exitosamente:
              </div>
              <pre className="code-box" style={{ color: '#a855f7' }}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="code-box" style={{ color: '#64748b', fontStyle: 'italic' }}>
              // Esperando envío del formulario...<br />
              // Escribe en los inputs y fíjate en el contador superior:<br />
              // ¡El número de re-renders NO aumenta mientras escribes!
            </div>
          )}


        </div>
      </div>
    </div>
  )
}

