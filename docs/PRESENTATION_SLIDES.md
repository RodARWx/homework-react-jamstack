# Slide Deck: Modern React Ecosystem & Jamstack Architecture

**Course**: Web Programming (Programación Web) – Universidad Central del Ecuador  
**Team**: Jhostin Molina, Santiago Lincango, Sebastian Escuntar, Rodrigo Sango  
**Presenter & Consolidator**: Sebastian Escuntar (`siescuntar@uce.edu.ec`)  
**Repository**: [github.com/RodARWx/homework-react-jamstack](https://github.com/RodARWx/homework-react-jamstack)  
**Deliverable**: Jira [HWM-15](https://sistemas-uce.atlassian.net/browse/HWM-15)

---

## Slide 1: Title & Project Overview
- **Title**: React Modern Ecosystem, Jamstack Architecture & Cloud Deployment
- **Objective**: Build a high-performance Single-Page Application (SPA) demonstrating industry-standard tools:
  - **Core Framework**: React 19 + Vite
  - **Routing**: React Router DOM (v7)
  - **Forms**: React Hook Form (Uncontrolled Inputs)
  - **Data Fetching**: Axios HTTP Client (Timeouts, JSON Parsing & Error Interception)
  - **State Management**: Zustand (Micro-store with Selector Pattern)
  - **Production Environment**: Multi-stage Docker + Nginx on AWS EC2 (Port 80)
- **Speaker Note**: *"Good morning/afternoon. Today we present our decoupled SPA architecture, detailing how modern web libraries solve performance, state synchronization, and deployment bottlenecks."*

---

## Slide 2: The Jamstack Paradigm vs Legacy Monoliths
- **Traditional Monolith**:
  - Web server compiles HTML upon every HTTP request.
  - Tight coupling between backend, database, and presentation layer.
  - High latency, complex scaling, vulnerability to database overload.
- **Jamstack Approach (JavaScript, APIs, Markup)**:
  - **Prerendered Markup**: Vite bundles static assets at build time.
  - **Edge / Static Distribution**: Nginx serves static HTML/JS/CSS with minimal overhead.
  - **Asynchronous APIs**: Client dynamically queries external APIs only when needed.
- **Key Advantages**: Sub-second page loads, maximum security perimeter, near-zero hosting costs.
- **Speaker Note**: *"In Jamstack, the server does not render views on the fly. It serves pre-compiled static bundles, and all dynamic behavior occurs via client-side API calls."*

---

## Slide 3: Client-Side Routing with React Router
- **SPA Challenge**: How to transition between multiple pages without browser refresh?
- **Solution**: React Router intercepts browser navigation via the **HTML5 History API** (`pushState`).
- **Implementation in `src/App.jsx`**:
  - `<Routes>` and `<Route>`: Evaluates path matching declaratively.
  - `<NavLink>` / `<Link>`: Updates the URL bar and view instantaneously without teardown.
  - `path="*"` with `<Navigate to="/" replace />`: Handles invalid URLs seamlessly.
- **Speaker Note**: *"Notice that when clicking between Home, Form, Axios, and Zustand, the browser tab never reloads. DOM nodes are swapped in memory by React Router."*

---

## Slide 4: High-Performance Forms with React Hook Form
- **The Controlled Component Problem**:
  - `useState` linked to `onChange` causes a full component re-render on **every single keystroke**.
  - Creates severe UI lag in large or dynamic forms.
- **The React Hook Form Solution**:
  - Employs **uncontrolled inputs** connected directly through native DOM `ref`.
  - Re-render count during typing = **0** (demonstrated live with our `renderCounter`).
  - Validation rules (required fields, email regex, min length) execute declaratively.
- **Speaker Note**: *"As proven by our live counter, typing in our form generates zero component re-renders. RHF isolates form state inside the DOM ref until submission."*

---

## Slide 5: Asynchronous HTTP Requests with Axios
- **Why Axios instead of native `fetch()`?**
  1. **Automatic Error Rejection**: Axios automatically throws on HTTP $4xx$ and $5xx$ statuses into `catch()`. `fetch()` resolves them as successful responses.
  2. **Automated JSON Parsing**: Data is immediately ready in `response.data` (no need for a second `await res.json()`).
  3. **Connection Timeouts**: Built-in `timeout: 5000` prevents indefinite hanging.
- **Demonstration in App**:
  - Successful GET request to JSONPlaceholder (`200 OK`).
  - Controlled trigger simulating a non-existent endpoint (`404 Not Found`).
- **Speaker Note**: *"Axios protects our application from hanging requests and guarantees that any HTTP response code outside 200–299 immediately triggers error-handling logic."*

---

## Slide 6: Lightweight Global State with Zustand
- **Context API vs Redux vs Zustand**:
  - **React Context**: Poor performance in frequent updates; triggers re-render across all consumers.
  - **Redux**: Excessive boilerplate (Actions, Reducers, Dispatchers, Types, Provider).
  - **Zustand**: Tiny footprint (<1 KB), **no `<Provider>` root wrapping**, zero boilerplate.
- **Selector Pattern in Action**:
  - `Navbar.jsx` only reads `(state) => state.counter`.
  - `ZustandDemo.jsx` reads `(state) => state.tasks`.
  - Updating a task **never re-renders the Navbar**, and incrementing the counter **never re-renders the task board**.
- **Speaker Note**: *"Zustand provides store access without wrapping the application in providers, and its selector pattern guarantees strict re-render isolation."*

---

## Slide 7: Containerization & Cloud Deployment (AWS EC2)
- **Multi-Stage Docker Architecture**:
  - **Stage 1 (`node:20-alpine`)**: Installs dependencies and runs `npm run build` to output the minified `/dist` folder.
  - **Stage 2 (`nginx:alpine`)**: Discards Node runtime, keeping only the compiled static bundle inside a lightweight Nginx image (~25 MB total).
- **Critical Nginx Directive**:
  ```nginx
  location / {
      try_files $uri $uri/ /index.html;
  }
  ```
  - Directs all deep routes (e.g. `/axios`, `/form`) back to `index.html` so React Router can take control, eliminating HTTP 404 errors on browser page reloads.
- **Cloud Infrastructure**: Hosted on an **AWS EC2 Linux Instance** with Security Group allowing public ingress traffic on **Port 80**.
- **Speaker Note**: *"By using a multi-stage Docker build, our final production image contains zero Node.js overhead—only pure Nginx serving static assets at wire speed on AWS EC2."*
