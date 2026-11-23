import { create } from 'zustand'

/**
 * ============================================================================
 * ZUSTAND GLOBAL STORE (Global State Management)
 * ============================================================================
 * Why Zustand?
 * 1. ZERO BOILERPLATE: Does not require actions, reducers, complex types, or verbose setup.
 * 2. NO PROVIDER HELL: Unlike React Context API or Redux, you don't need to wrap
 *    your component tree in <Provider store={...}>.
 * 3. SELECTOR PATTERN: Allows components to subscribe strictly to the exact slice
 *    of state they need (e.g. (state) => state.counter). If other slices mutate,
 *    this component does NOT re-render unnecessarily.
 * ============================================================================
 */

export const useStore = create((set) => ({
  // --- 1. Counter State ---
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: Math.max(0, state.counter - 1) })),
  resetCounter: () => set({ counter: 0 }),

  // --- 2. Tasks / Notes State ---
  tasks: [
    { id: 1, text: 'Understand Jamstack architecture principles', completed: true },
    { id: 2, text: 'Explain why React Hook Form avoids re-renders via ref', completed: false },
    { id: 3, text: 'Demonstrate Axios error handling vs native fetch', completed: false }
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

