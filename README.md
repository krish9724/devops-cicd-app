# 🚀 AI Task Manager — Cloud & DevOps MVP

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=github-actions)
![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![AI](https://img.shields.io/badge/AI-Gemini%20API-orange?logo=google)

A full-stack **AI-powered Task Manager** app designed for modern cloud architectures. Built with React + Node.js, integrated with Large Language Models, containerized with Docker, and deployed on Render.com with CI/CD techniques.

---

## 🌟 Intelligent Features

This project utilizes the **GenAI / Gemini API** to automatically augment your tasks:
* **🤖 Auto Task Summary**: Explains what the task actually means.
* **⚡ Priority Suggestion**: High, Medium, or Low tags based on semantic importance.
* **⏳ Smart Deadline Recommendation**: Calculates how many days a task logically requires.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 (Glassmorphism & Dark Mode UI) |
| **Backend** | Node.js + Express |
| **LLM Integration** | Google Gemini API (or OpenAI) |
| **Containerization** | Docker & Docker Compose |
| **CI/CD** | GitHub Actions |
| **Cloud Hosting** | Render.com (PaaS Free Tier) |

---

## ☁️ Cloud Deployment (Render.com)

1. Ensure the code is pushed to your GitHub Repository.
2. Sign up on [Render.com](https://render.com) using GitHub.
3. Click **New +** -> **Web Service** and correctly link your GitHub repository.
4. Set the **Build Command**:
   ```bash
   npm install --prefix server && npm install --prefix client && npm run build --prefix client
   ```
5. Set the **Start Command**:
   ```bash
   node server/index.js
   ```
6. Add the secret environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: `your_gemini_key_here`
7. Click **Deploy**. Render will automatically build the React Interface and start the Node Express server.

---

## 🔐 Environment Variables (.env & Secrets)

### Backend `server/.env`
Create a `.env` file inside the `/server` directory:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

### GitHub Secrets for CI/CD
For automated deployment via GitHub actions, configure repository secrets:
| Secret | Value |
|--------|-------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |

---

## 👥 Team Roles

This project is structured for a 5-6 person development team:

1. **Frontend Engineer 1**: UI/UX, React Glassmorphism component design.
2. **Frontend Engineer 2**: State Management, Client-side fetching & Routing.
3. **Backend Engineer 1**: Express server setup, core REST API endpoints.
4. **Backend Engineer 2**: Data persistence, API payload structuring.
5. **DevOps Engineer**: Dockerizing the app, wiring GitHub Actions & Cloud Deployment.
6. **AI Integration Specialist**: Prompt Engineering & API Integration (Gemini/OpenAI).

---

## ⚙️ Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/krish9724/devops-cicd-app

# Run Backend
cd server
npm install
# Ensure you have a .env with GEMINI_API_KEY!
node index.js

# Run Frontend (new terminal)
cd client
npm install
npm start
```

App runs at `http://localhost:3000`.

---

## 👨‍💻 Author
**Krish Gupta & Team** — JG University
Submitted to: **MR. MAYANK SIR**
Project: DevOps Assignment — AI, Cloud & CI/CD Pipeline
