# 🚀 DevOps CI/CD Pipeline — React + Node.js

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=github-actions)
![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)

A full-stack **Task Manager** app built with React + Node.js, containerized with Docker, and automatically deployed via GitHub Actions CI/CD pipeline.

---

## 🛠 Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Backend | Node.js + Express |
| Containerization | Docker |
| Container Registry | Docker Hub |
| CI/CD | GitHub Actions |
| Testing | Jest + Supertest |

---

## 🔄 CI/CD Pipeline

Every `git push` to `main` triggers the pipeline automatically:

```
Code Push → GitHub Actions → Run Tests → Build Docker Image → Push to Docker Hub
```

**3 Jobs in the pipeline:**
1. 🧪 **Test** — Runs backend (Jest) and frontend (React Testing Library) tests
2. 🐳 **Build & Push** — Builds Docker image and pushes to Docker Hub (only if tests pass)
3. 📢 **Notify** — Prints pipeline summary

---

## 📁 Project Structure

```
devops-cicd-app/
├── .github/workflows/cicd.yml   # CI/CD Pipeline
├── client/                      # React Frontend
├── server/                      # Node.js Backend
├── Dockerfile                   # Multi-stage Docker build
└── docker-compose.yml
```

---

## ⚙️ Setup & Run Locally

```bash
# Backend
cd server && npm install && node index.js

# Frontend (new terminal)
cd client && npm install && npm start
```

App runs at `http://localhost:3000`

---

## 🔑 GitHub Secrets Required

| Secret | Value |
|--------|-------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |

---

## 👨‍💻 Author

**Krish Gupta** — JG University
- GitHub: [@krish9724](https://github.com/krish9724)
- Project: DevOps Assignment — Automated CI/CD Pipeline
