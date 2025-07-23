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

- **Frontend**: The React-based UI where users build and monitor their automation flows
- **API**: The main REST/GraphQL API for managing users, flows, triggers, and actions
- **Hooks Handler**: A lightweight, dedicated service that ingests incoming webhook events at scale and pushes them into the Redis queue for processing
- **Worker**: Listens for jobs on the Redis queue. This is the workhorse that executes the defined actions (e.g., sending an email, calling an API). Multiple worker instances can be run to scale throughput
- **Processor**: Implements the Transactional Outbox pattern to ensure reliable, atomic operations between the database and the task queue
