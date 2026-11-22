# Homework: React Ecosystem & Jamstack Architecture

[![Jira Project](https://img.shields.io/badge/Jira-HWM%20Sprint%201-0052CC?logo=jira)](https://sistemas-uce.atlassian.net/jira/software/projects/HWM/boards)
[![GitHub Repo](https://img.shields.io/badge/GitHub-RodARWx%2Fhomework--react--jamstack-181717?logo=github)](https://github.com/RodARWx/homework-react-jamstack)

**Course**: Web Programming (Programación Web)  
**Institution**: Universidad Central del Ecuador (UCE)  
**Jira Board**: [Homework - WP - Monday (HWM)](https://sistemas-uce.atlassian.net/jira/software/projects/HWM/boards)

---

## 👥 Team Members & Responsibilities

| Member | Institutional Email | Assigned Tasks (Jira) |
| :--- | :--- | :--- |
| **Jhostin Molina** | `jamolinap@uce.edu.ec` | [HWM-10](https://sistemas-uce.atlassian.net/browse/HWM-10), [HWM-11](https://sistemas-uce.atlassian.net/browse/HWM-11) (React Router, Jamstack Setup & React Hook Form) |
| **Santiago Lincango** | `fslincango@uce.edu.ec` | [HWM-12](https://sistemas-uce.atlassian.net/browse/HWM-12), [HWM-13](https://sistemas-uce.atlassian.net/browse/HWM-13) (Axios, Zustand & Docker/Nginx Setup) |
| **Sebastian Escuntar** | `siescuntar@uce.edu.ec` | [HWM-14](https://sistemas-uce.atlassian.net/browse/HWM-14), [HWM-15](https://sistemas-uce.atlassian.net/browse/HWM-15) (English Technical Report & Slide Presentation) |
| **Rodrigo Sango** | `brayannsa6@gmail.com` | [HWM-16](https://sistemas-uce.atlassian.net/browse/HWM-16) (AWS EC2 Cloud Deployment, Port 80 Setup & QA) |

---

## 🛠️ Technology Stack & Architecture

- **Build Tool & Framework**: Vite + React 18 / 19
- **Navigation (SPA)**: React Router (v6 / v7)
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Global State Management**: Zustand
- **Architecture**: Jamstack (Decoupled static frontend served by Nginx + asynchronous API consumption)
- **Containerization & Deployment**: Docker (Multi-stage build) / Nginx Alpine on **AWS EC2 (Port 80)**

---

## 🚀 Getting Started

### Local Development
```bash
# 1. Clone the repository
git clone https://github.com/RodARWx/homework-react-jamstack.git
cd homework-react-jamstack

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

### Run with Docker (Production Simulation)
```bash
docker compose up --build
```
Access at `http://localhost` (Port 80).

---

## 📌 Jira Smart Commit Guidelines

To automatically track commits and link work to Jira, use your issue key in commit messages:
```bash
git commit -m "HWM-10: Implement React Router routes and navbar"
git commit -m "HWM-11: Add form validation with React Hook Form"
git commit -m "HWM-12: Implement Axios request with loading and error states"
git commit -m "HWM-13: Create Zustand global store"
```
