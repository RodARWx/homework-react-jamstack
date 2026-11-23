# Oral Defense Q&A Cheatsheet: React Ecosystem & Jamstack Architecture

**Document Purpose**: Direct, technically rigorous answers to common professor questions during oral evaluation.  
**Deliverable Link**: [Jira HWM-15](https://sistemas-uce.atlassian.net/browse/HWM-15)  
**Author**: Sebastian Escuntar (`siescuntar@uce.edu.ec`)

---

### Q1: What is the core difference between Jamstack and traditional Server-Side Rendering (SSR)?
**Answer**:
In traditional SSR (e.g. PHP, Django, Spring MVC), the web server dynamically queries the database and compiles the HTML string for every client request. In **Jamstack**, the frontend is pre-built into static assets (HTML, CSS, JS) at compile-time and served via a CDN or web server (Nginx). All dynamic interactions occur asynchronously on the client via headless APIs. This reduces server CPU load, eliminates database contention on page load, and accelerates Time-to-First-Byte (TTFB).

---

### Q2: Why does React Hook Form have better performance than standard React `useState` forms?
**Answer**:
A standard controlled input using `value={state}` and `onChange={(e) => setState(e.target.value)}` triggers a complete component re-render on **every single keystroke** ($N$ keystrokes = $N$ Virtual DOM diffing cycles).  
**React Hook Form** uses **uncontrolled components** connected via React `ref`. Input data is maintained directly by the native browser DOM and read only when required (on validation trigger or submission). In our live demonstration in `src/pages/FormDemo.jsx`, the render counter remains at `1` while typing, proving zero re-renders.

---

### Q3: Why use Axios over the browser's native `fetch()` API?
**Answer**:
There are three critical differences:
1. **HTTP Error Handling**: `fetch()` only rejects its promise on network failures or CORS blocks. It considers HTTP `404 Not Found` or `500 Internal Server Error` as resolved promises (`response.ok === false`). `axios` automatically rejects any status code outside the $2xx$ range into the `catch` block.
2. **Automated JSON Parsing**: `axios` inspects the `Content-Type` header and parses JSON automatically into `response.data`. `fetch()` requires an extra manual step (`await response.json()`).
3. **Built-in Timeouts**: `axios` supports a declarative `timeout` parameter (configured to 5000 ms in our `src/services/api.js`). In `fetch()`, this requires manual `AbortController` instantiation.

---

### Q4: Why choose Zustand instead of Redux or the React Context API?
**Answer**:
- **Versus React Context**: When a value in a React Context updates, **every** component consuming that context is forced to re-render, even if it only uses an unaffected sub-property.
- **Versus Redux**: Redux introduces heavy boilerplate (reducers, action creators, dispatchers, and wrapping the app root with `<Provider>`).
- **Zustand Advantage**: Zustand has no provider wrappers (*zero provider hell*), an ultra-light footprint (<1 KB), and utilizes the **selector pattern** (`useStore(state => state.counter)`). Only components subscribed to that specific state slice re-render when that slice mutates.

---

### Q5: What does the Nginx directive `try_files $uri $uri/ /index.html;` do and why is it mandatory for SPAs?
**Answer**:
In a Single-Page Application, routes like `/router` or `/axios` do not exist as physical folders or `.html` files on the Nginx file system.  
When a user reloads the browser at `http://<IP>/axios`, Nginx first searches for a file matching `/axios` (`$uri`), then a directory `/axios/` (`$uri/`). Since neither exists, without `try_files` Nginx would return a **404 Not Found** error.  
The directive tells Nginx to fallback and serve `/index.html`, allowing the loaded React Router bundle to parse the URL and mount the corresponding view client-side.

---

### Q6: What is the purpose of a multi-stage Docker build?
**Answer**:
A single-stage build that keeps Node.js in production produces container images exceeding 400–800 MB and includes development tools and compilers that create security vulnerabilities.  
Our **multi-stage build** uses `node:20-alpine` in Stage 1 strictly as a compiler (`npm run build`). Stage 2 copies only the resulting compiled `/dist` directory into an ultra-clean `nginx:alpine` image. The final production image is ~25 MB, has zero Node runtime vulnerabilities, and serves static files at maximum throughput.

---

### Q7: How does React Router maintain navigation without reloading the browser window?
**Answer**:
It leverages the HTML5 **History API** (`history.pushState` and `window.addEventListener('popstate')`). When clicking a `<NavLink>`, React Router intercepts the event, calls `preventDefault()` to prevent a browser HTTP GET request, updates the address bar via `pushState`, and tells React to unmount the previous component and mount the new one in-memory.

---

### Q8: What security group configuration is necessary on AWS EC2 for this deployment?
**Answer**:
The EC2 Security Group acts as a virtual firewall:
- **Port 80 (HTTP)**: Inbound rule set to `0.0.0.0/0` (IPv4) to allow public web access.
- **Port 22 (SSH)**: Inbound rule restricted to administrative IP ranges for secure remote server configuration and Docker execution.
