# Technical Report: Modern React Ecosystem and Jamstack Architecture

**Course**: Web Programming (Programación Web)  
**Institution**: Universidad Central del Ecuador (UCE) – Facultad de Ingeniería y Ciencias Aplicadas  
**Author / Academic Consolidator**: Sebastian Escuntar (`siescuntar@uce.edu.ec`)  
**Project Repository**: [GitHub - RodARWx/homework-react-jamstack](https://github.com/RodARWx/homework-react-jamstack)  
**Jira Tracking**: [HWM-14 (Technical Report)](https://sistemas-uce.atlassian.net/browse/HWM-14) / [HWM-15 (Presentation)](https://sistemas-uce.atlassian.net/browse/HWM-15)  

---

## 1. Introduction to Jamstack Architecture

Modern web development has shifted away from traditional server-rendered monolithic architectures (where a web server dynamically builds HTML pages upon each client request) toward **Jamstack** (JavaScript, APIs, and Markup).

```
+-------------------------------------------------------------------------------+
|                             JAMSTACK PARADIGM                                 |
+-------------------------------------------------------------------------------+
|  1. PRE-RENDER / BUILD TIME                                                   |
|     Vite compiles JSX/TSX -> Static Assets (HTML, minified JS, CSS bundles)   |
|                                                                               |
|  2. EDGE DELIVERY                                                             |
|     Nginx (Alpine Linux) delivers immutable static assets with high throughput|
|                                                                               |
|  3. ASYNCHRONOUS RUNTIME                                                      |
|     Client browser executes SPA logic -> Requests data asynchronously via API  |
+-------------------------------------------------------------------------------+
```

### Architectural Principles:
1. **Decoupled Frontend**: The presentation layer is completely isolated from backend application logic and database persistence.
2. **Static Prerendering & Fast Distribution**: The entire user interface is bundled ahead of time into static HTML/JS/CSS files, which can be served directly by lightweight web servers (e.g., Nginx) or distributed Content Delivery Networks (CDNs).
3. **Dynamic Interactivity via APIs**: Dynamic functionality (e.g., user authentication, data fetching, mutations) is handled exclusively client-side via asynchronous HTTPS requests to headless APIs.
4. **Enhanced Security and Scalability**: Eliminating server-side runtime template compilation reduces database connection exhaustion risks, reduces server resource footprints, and significantly mitigates common attack surfaces (e.g., SQL injection directly on UI servers).

In our project, the entry page (`src/pages/HomeJamstack.jsx`) visualizes this transition, contrasting legacy tightly coupled architectures with modular Jamstack deployments.

---

## 2. Client-Side Routing with React Router

In a Single-Page Application (SPA), routing is executed entirely on the client side via the browser's HTML5 History API (`pushState`, `replaceState`, and `popstate` events), eliminating full-page browser reloads.

### Implementation Architecture (`src/App.jsx`):
```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomeJamstack from './pages/HomeJamstack'
import RouterDemo from './pages/RouterDemo'
import FormDemo from './pages/FormDemo'
import AxiosDemo from './pages/AxiosDemo'
import ZustandDemo from './pages/ZustandDemo'

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeJamstack />} />
          <Route path="/router" element={<RouterDemo />} />
          <Route path="/form" element={<FormDemo />} />
          <Route path="/axios" element={<AxiosDemo />} />
          <Route path="/zustand" element={<ZustandDemo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
```

### Key Technical Mechanisms:
- **Declarative Route Table**: `<Routes>` matches the current browser `window.location.pathname` against child `<Route>` definitions using hierarchical scoring algorithms.
- **Client Navigation**: `<NavLink>` and `<Link>` prevent default anchor (`<a href="...">`) HTTP requests, invoking `history.pushState` to transition views instantaneously.
- **Wildcard Fallback**: The catch-all pattern `path="*"` safely intercepts invalid URLs and redirects users back to `/` via `<Navigate replace />`, preventing broken client states.

---

## 3. Form Handling and Performance with React Hook Form

Handling forms with traditional controlled components (`useState` binding `value` and `onChange`) triggers a full React component re-render on **every single keystroke**. In complex enterprise forms, this causes severe input lag and excessive Virtual DOM reconciliation.

### Uncontrolled Pattern via Native DOM `ref`:
`react-hook-form` embraces **uncontrolled inputs**, leveraging React `ref` to register inputs directly into an internal subscriber store. The component re-renders **only** when validation errors transition or when submitting data.

### Implementation Details (`src/pages/FormDemo.jsx`):
```jsx
const renderCounter = useRef(0)
renderCounter.current++ // Proves zero re-renders during typing

const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
} = useForm({
  defaultValues: { fullName: '', email: '', category: 'student', acceptTerms: false }
})

// Input registration with validation rules
<input
  type="email"
  className={`form-input ${errors.email ? 'error' : ''}`}
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  })}
/>
```

| Metric / Feature | Controlled Form (`useState`) | React Hook Form (`ref`) |
| :--- | :--- | :--- |
| **Re-render per keystroke** | Yes ($\mathcal{O}(N)$ renders for $N$ characters) | No ($\mathcal{O}(1)$ render on mount / error changes) |
| **DOM Synchronization** | Virtual DOM $\leftrightarrow$ Real DOM sync loop | Native input reads directly via DOM `ref` |
| **Validation Mechanism** | Manual checks inside `onChange` handlers | Declarative schema / validation rules on `register` |
| **Submit Execution** | Reads state array/object | `handleSubmit` validates and extracts raw DOM values |

---

## 4. Asynchronous HTTP Requests with Axios

While the browser provides native `window.fetch`, production enterprise applications utilize **Axios** due to its superior error-handling semantics, automated data transforms, and lifecycle interceptors.

### Configured Axios Client (`src/services/api.js`):
```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000, // Aborts hanging connections after 5 seconds
});

export default api;
```

### Lifecycle & Error Interception (`src/pages/AxiosDemo.jsx`):
```javascript
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [statusCode, setStatusCode] = useState(null)

const fetchUsers = async () => {
  setLoading(true)
  setError(null)
  try {
    const response = await api.get('/users?_limit=4')
    setUsers(response.data) // Automatic JSON serialization
    setStatusCode(response.status) // HTTP 200 OK
  } catch (err) {
    // Axios automatically rejects any status outside the 2xx range
    setError(err.message)
    if (err.response) setStatusCode(err.response.status) // e.g. 404 Not Found
  } finally {
    setLoading(false)
  }
}
```

### Technical Comparison: Axios vs Native `fetch`:
1. **HTTP Error Rejection**:
   - `fetch()` resolves successfully on HTTP `404` or `500` (it only rejects on network failures or CORS blocks); developers must manually check `if (!response.ok)`.
   - `axios` automatically rejects the Promise whenever the status code falls outside $2xx$, redirecting control straight to the `catch` block.
2. **Data Parsing**:
   - `fetch()` requires an explicit two-step promise: `await (await fetch(url)).json()`.
   - `axios` inspects headers and performs automatic JSON transformation into `response.data`.
3. **Timeout Protection**:
   - `fetch()` requires configuring an explicit `AbortController` and `setTimeout`.
   - `axios` includes a native declarative `timeout: 5000` property.

---

## 5. Modern Global State Management with Zustand

Legacy state libraries like Redux require heavy boilerplate (actions, action creators, reducers, dispatchers, middleware), and the native React Context API suffers from the "re-render all consumers" problem whenever any sub-property changes.

**Zustand** is a minimalist, unopinionated state management solution based on closure-based stores and pub/sub state subscriptions.

### Centralized Store Definition (`src/store/useStore.js`):
```javascript
import { create } from 'zustand'

export const useStore = create((set) => ({
  // State slice 1: Global Counter
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: Math.max(0, state.counter - 1) })),
  resetCounter: () => set({ counter: 0 }),

  // State slice 2: Task Board
  tasks: [
    { id: 1, text: 'Understand Jamstack Architecture', completed: true },
    { id: 2, text: 'Examine React Hook Form ref behavior', completed: false }
  ],
  addTask: (text) => set((state) => ({
    tasks: [...state.tasks, { id: Date.now(), text, completed: false }]
  })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
  })),
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id)
  }))
}))
```

### Component Consumption via Selector Pattern (`src/pages/ZustandDemo.jsx` & `src/components/Navbar.jsx`):
```javascript
// In Navbar.jsx: Only re-renders when counter changes
const counter = useStore((state) => state.counter)

// In ZustandDemo.jsx: Subscribes to tasks without triggering Navbar re-renders
const tasks = useStore((state) => state.tasks)
const addTask = useStore((state) => state.addTask)
```

### Technical Superiority:
- **Zero Provider Hell**: No `<StoreProvider>` wrapping the DOM root. Components import `useStore` anywhere in the tree.
- **Fine-Grained Selectors**: Using `(state) => state.counter` ensures that mutations to `tasks` will never trigger a re-render in components that only read `counter`.
- **Lightweight Footprint**: Less than 1 KB minified, zero third-party dependencies.

---

## 6. Production Deployment Overview on AWS EC2

Deploying a Jamstack SPA into production requires high-performance static asset hosting and client-side route resolution.

### Multi-Stage Containerization (`Dockerfile`):
```dockerfile
# Stage 1: Build the Vite production bundle
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve compiled assets with Nginx Alpine
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Critical Nginx Configuration for SPAs (`nginx.conf`):
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA Fallback directive: Prevents 404 errors on browser page reloads
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### AWS EC2 Cloud Infrastructure:
1. **Compute Instance**: Amazon Linux 2023 / Ubuntu instance provisioned via AWS Academy.
2. **Network Security Group**: Inbound rule permitting **HTTP on Port 80** (`0.0.0.0/0`) for public web traffic, and SSH Port 22 restricted for system administration.
3. **Execution**: The container is spun up via Docker Engine (`docker run -d -p 80:80 homework-jamstack` or `docker compose up -d`), serving the pre-built React artifact instantly with sub-millisecond static response times.

---

## 7. Official Documentation References & Citations

```text
[1] Jamstack Community, "Jamstack Architecture Overview," Jamstack.org, 2024. 
    [Online]. Available: https://jamstack.org

[2] React Router Core Team, "React Router v7 Documentation," ReactRouter.com, 2025. 
    [Online]. Available: https://reactrouter.com

[3] B. L. Kuo et al., "React Hook Form: Performant, flexible and extensible forms with easy-to-use validation," 
    React-Hook-Form.com, 2025. [Online]. Available: https://react-hook-form.com

[4] M. Zabriskie et al., "Axios: Promise based HTTP client for the browser and node.js," 
    Axios-HTTP.com, 2025. [Online]. Available: https://axios-http.com

[5] P. Henschel et al., "Zustand: Bear necessities for state management in React," 
    Poimandres, GitHub, 2025. [Online]. Available: https://github.com/pmndrs/zustand

[6] Docker Inc., "Multi-stage builds," Docker Documentation, 2025. 
    [Online]. Available: https://docs.docker.com/build/building/multi-stage/

[7] Nginx Inc., "Configuring NGINX for Single Page Applications (try_files directive)," 
    Nginx.org Documentation, 2024. [Online]. Available: https://nginx.org/en/docs/
```
