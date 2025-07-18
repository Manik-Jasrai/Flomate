# Flomate – Your Automation Platform

<div align="center">
  <img src="https://placehold.co/150x150/101010/f59e0b?text=🧠" alt="Flomate Logo" width="120">
  <h3>Automate anything, anywhere. Triggers, actions, and flows that just work.</h3>
  <p>An open-source, backend-heavy automation platform to connect your apps and build powerful workflows, similar to Zapier or n8n. Built with a modern, scalable, and developer-friendly stack.</p>
  
  <p>
    <a href="https://github.com/your-username/flomate/issues">Report Bug</a>
    ·
    <a href="https://github.com/your-username/flomate/issues">Request Feature</a>
  </p>

  <p>
    <img src="https://img.shields.io/github/stars/your-username/flomate?style=for-the-badge&color=f59e0b" alt="GitHub Stars"/>
    <img src="https://img.shields.io/github/forks/your-username/flomate?style=for-the-badge&color=f59e0b" alt="GitHub Forks"/>
    <img src="https://img.shields.io/github/license/your-username/flomate?style=for-the-badge&color=f59e0b" alt="License"/>
    <img src="https://img.shields.io/github/last-commit/your-username/flomate?style=for-the-badge&color=f59e0b" alt="Last Commit"/>
  </p>
</div>

## 🚀 Overview

Flomate is a powerful automation platform designed to connect apps and automate workflows. It allows users to visually define **Triggers** (events) and **Actions** (tasks) that run in response, enabling seamless app integration via webhooks, APIs, and custom logic.

Built from the ground up with a focus on performance, scalability, and developer experience, Flomate leverages a modern TypeScript-based microservices architecture managed within a Turborepo.

<div align="center">
  <img src="https://placehold.co/800x450/1a1a1a/f59e0b?text=Flomate+UI+Screenshot+or+GIF" alt="Flomate UI Preview" style="border-radius: 8px; border: 1px solid #333;" />
</div>

## ⚙️ Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🧠 **Trigger-Action Model** | Create workflows like: "When a form is submitted → Send an email + write to the database." | ✅ Available |
| 🌐 **Webhook Support** | Accept external events from any service that supports webhooks, like GitHub, Stripe, or custom apps. | ✅ Available |
| 🔁 **Retry & Logging** | Robust execution engine with support for automatic retries and detailed success/failure logging. | ✅ Available |
| 🛠️ **Extensible Actions** | Easily add new actions. Core examples include sending emails, saving to a DB, and more. | ✅ Available |
| 👤 **Clean User Interface** | A minimal, nerdy UI built with React & Tailwind CSS for visually creating and managing flows. | ✅ Available |
| ⛓️ **Microservices-Ready** | Designed as a distributed system for high availability and horizontal scaling. | ✅ Available |

## 🏗️ Tech Stack & Architecture

Flomate is a TypeScript-based Turborepo project. It employs a microservices architecture where each service has a distinct responsibility, communicating via a Redis-based task queue and a shared PostgreSQL database.

### Core Technologies
- **Monorepo**: Turborepo
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Task Queue**: Redis
- **Containerization**: Docker & Docker Compose
- **Type Safety**: Zod for end-to-end type validation

### System Architecture

The system is composed of five core services that work in concert to handle workflows:

```mermaid
graph TD
    subgraph "User Interaction"
        A[Frontend - React]
    end

    subgraph "External Services"
        B[Third-Party Apps <br/>(e.g., GitHub, Stripe)]
    end

    subgraph "Flomate Backend"
        C[API Service <br/>(Manages Flows/Users)]
        D[Hooks Handler <br/>(Ingests Webhooks)]
        E[Redis Queue <br/>(Task Broker)]
        F[Worker <br/>(Executes Actions)]
        G[Processor <br/>(Transactional Outbox)]
        H[PostgreSQL DB]
    end

    A -- Manages Flows --> C
    B -- Webhook Event --> D
    C -- Writes to --> H
    D -- Pushes Job --> E
    E -- Delivers Task --> F
    F -- Executes Logic & Writes to --> H
    G -- Reads from DB & Processes --> F
    F -- Interacts with --> B
```

- **Frontend**: The React-based UI where users build and monitor their automation flows
- **API**: The main REST/GraphQL API for managing users, flows, triggers, and actions
- **Hooks Handler**: A lightweight, dedicated service that ingests incoming webhook events at scale and pushes them into the Redis queue for processing
- **Worker**: Listens for jobs on the Redis queue. This is the workhorse that executes the defined actions (e.g., sending an email, calling an API). Multiple worker instances can be run to scale throughput
- **Processor**: Implements the Transactional Outbox pattern to ensure reliable, atomic operations between the database and the task queue

## 📦 Example Use Cases

- **Marketing Automation**: "When a new user signs up on our app → Send a personalized Welcome Email via Nodemailer."
- **Internal Ops**: "When a new issue is created in a GitHub repo → Send a notification to the team on Slack/Discord."
- **Data Sync**: "When a new row is added to a Google Sheet → Insert a sanitized version into our PostgreSQL database."

## 🚀 Getting Started

Follow these steps to get a local instance of Flomate up and running.

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (recommended for managing the monorepo)
- Docker and Docker Compose

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/flomate.git
   cd flomate
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in the required values (database URLs, Redis connection, API keys, etc.).

4. **Start the Backend Services:**
   ```bash
   docker-compose up -d
   ```

5. **Run Database Migrations:**
   ```bash
   pnpm db:push
   ```

6. **Run the Development Servers:**
   ```bash
   pnpm dev
   ```

You should now be able to access the Flomate frontend at `http://localhost:5173` (or the configured port for the Vite dev server).

## 🗺️ Roadmap & Future Plans

We have a clear vision for making Flomate the go-to open-source automation tool. Here's what's next:

- [ ] **Advanced Built-in Actions**: Add native integrations for Notion, Discord, Slack, and more
- [ ] **Conditional Logic**: Support chained actions with if/else conditions
- [ ] **Visual Execution History**: A per-flow, real-time log of every execution
- [ ] **OAuth Management**: Securely manage credentials for third-party app integrations
- [ ] **Deployment-Ready Architecture**: Provide official Helm charts and guides for Kubernetes deployment
- [ ] **Community Action Marketplace**: Allow users to submit and share their own custom actions

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">
  <strong>Built with ❤️ by the Flomate team</strong>
</div>
