# AI Task Manager - DevOps Project Presentation
**Submitted to:** MR. SUMIT BHAT SIR
**Course:** DevOps & Cloud Computing
**Team:** Krish Gupta & Team (JG University)

---

## 🛑 Slide 1: Problem Statement
**Traditional Task Management is Passive**
* Typical to-do lists rely entirely on user input for estimation.
* Users struggle to accurately prioritize tasks.
* Estimating deadlines is often a guess, leading to project delays.
* **Our Solution:** An AI-powered Task Manager that actively profiles tasks upon creation.

---

## ✨ Slide 2: The Solution Architecture
**Bringing AI, Web Development, and DevOps Together**
* **Frontend Flow:** React 18 application with a modern Glassmorphism UI where users add tasks.
* **Backend Processing:** Node.js Express Server intercepts task creation.
* **AI Analysis:** The task title is sent to Google's **Gemini AI API**, which returns an intelligent *Priority*, *Summary*, and *Deadline Estimation*.
* **Deployment:** Containerized and fully automated pipeline.

---

## ☁️ Slide 3: Cloud & DevOps implementation
**Enterprise-Grade Infrastructure Pipeline**
* **Docker:** The entire backend and frontend are containerized via a multi-stage `Dockerfile`.
* **GitHub Actions (CI/CD):** 
  * On every `git push`, tests are automated using Jest.
  * If tests pass, Docker images are built and pushed securely to Docker Hub.
* **Hosting (AWS/Azure):** Designed to pull the Docker image and host on an EC2 instance or Azure VM.
* **Security:** API keys (`.env`) and CI/CD secrets (`DOCKERHUB_TOKEN`) securely managed.

---

## 🤖 Slide 4: AI Capabilities in Detail
**Automating Project Management:**
* *Task Input:* "Fix the database schema bug"
* **AI Output:**
  * **Priority:** HIGH 🔴
  * **Deadline:** 2 Days ⏳
  * **Summary:** Modifying database structure to resolve data inconsistency.
  * **Why?:** Schema bugs can corrupt data across the application.

---

## 👥 Slide 5: The Team Roles
**A 6-Person Collaborative Effort**
1. **Frontend UI/UX (Student 1):** Built the Glassmorphism theme and animations.
2. **Frontend Logic (Student 2):** Implemented React hooks, fetch API, and state.
3. **Backend API (Student 3):** Developed the Express logic and Data structures.
4. **AI Specialist (Student 4):** Handled prompt engineering and Gemini API connectivity.
5. **DevOps Engineer (Student 5):** Configured Docker Compose, Dockerfiles, and GitHub Secrets.
6. **Cloud Architect (Student 6):** Set up Azure VM/AWS EC2 and managed the CI/CD pipeline triggers.

---

## 🚀 Slide 6: Live Demo & Outcomes
**Thank You!**
* **Scalable:** The architecture allows microservices scaling.
* **Intelligent:** Reduces manual workload through GenAI.
* **Automated:** Zero-downtime deployment capabilities thanks to DevOps methodologies.
* *Any Questions?*
