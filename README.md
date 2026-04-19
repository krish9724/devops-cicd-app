# 🚀 AI Task Manager — Cloud & DevOps MVP

![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?logo=github-actions)
![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![AI](https://img.shields.io/badge/AI-Gemini%20API-orange?logo=google)

A full-stack **AI-powered Task Manager** app designed for modern cloud architectures. Built with React + Node.js, integrated with Large Language Models, containerized with Docker, and designed for deployment on AWS/Azure via GitHub Actions CI/CD pipelines.

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
| **Cloud Hosting** | AWS EC2 / Azure Virtual Machine (Free Tier) |

---

## ☁️ Cloud Deployment (AWS EC2 / Azure VM)

1. Provision an **Ubuntu Server 22.04 LTS** instance on AWS EC2 or Azure VM.
2. Open ports `80` (HTTP), `443` (HTTPS), and `5000` (Backend API) in the Security Group / Firewalls.
3. SSH into your instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-vm-ip
   ```
4. Install Docker and Docker Compose on the VM.
5. Clone the repository and configure `.env` secrets:
   ```bash
   git clone https://github.com/krish9724/devops-cicd-app
   cd devops-cicd-app/server
   nano .env # Add GEMINI_API_KEY
   ```
6. Run the containers:
   ```bash
   docker-compose up -d --build
   ```

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
Submitted to: **MR. SUMIT BHAT SIR**
Project: DevOps Assignment — AI, Cloud & CI/CD Pipeline
