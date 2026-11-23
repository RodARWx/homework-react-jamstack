import { create } from 'zustand'

/**
 * ============================================================================
 * ZUSTAND GLOBAL STORE (Gestión de Estado Global)
 * ============================================================================
 * ¿Por qué Zustand?
 * 1. ZERO BOILERPLATE: No requiere actions, reducers, types complejos ni configuración extensa.
 * 2. NO PROVIDER HELL: A diferencia de React Context API o Redux, no necesitas envolver
 *    tu árbol de componentes con <Provider store={...}>.
 * 3. SELECTOR PATTERN: Permite suscribir componentes solo a la porción exacta de estado
 *    que necesitan (ej: (state) => state.counter). Si otra parte cambia, este componente
 *    NO se re-renderiza innecesariamente.
 * ============================================================================
 */

export const useStore = create((set) => ({
  // --- 1. Estado de Contador ---
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: Math.max(0, state.counter - 1) })),
  resetCounter: () => set({ counter: 0 }),

  // --- 2. Estado de Lista de Tareas / Notas ---
  tasks: [
    { id: 1, text: 'Comprender la arquitectura Jamstack', completed: true },
    { id: 2, text: 'Explicar por qué React Hook Form no re-renderiza con ref', completed: false },
    { id: 3, text: 'Demostrar manejo de errores con Axios vs fetch', completed: false }
  ],

  addTask: (text) => set((state) => ({
    tasks: [
      ...state.tasks,
      { id: Date.now(), text, completed: false }
    ]
  })),

  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  })),

  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  }))
}))

