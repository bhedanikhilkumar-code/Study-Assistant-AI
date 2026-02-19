# Study Assistant AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)

**A modern AI-powered study planner, smart tutor, notes manager, and analytics dashboard.**

Study Assistant AI is a full-featured learning productivity platform designed to help students plan, learn, and improve with AI-driven guidance. It combines intelligent tutoring, structured study planning, organized note management, and actionable performance insights in one streamlined experience.

## ✨ Features

- **AI Chat Tutor** for real-time explanations and guided learning
- **Study Planner (2000–2099 range)** for long-term and daily planning
- **Notes Management** to create, edit, and organize study notes
- **Subject Organization** for clean course/topic categorization
- **Analytics Dashboard** with visual performance and progress tracking
- **Admin Panel** for platform and user management workflows
- **Dark/Light Mode** for comfortable studying in any environment
- **Custom AI Model Support** via configurable provider endpoints/models

## 🧰 Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**
- **Recharts**

## 🚀 Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/<your-username>/study-assistant-ai.git
cd study-assistant-ai
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start development server

```bash
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file (or copy from `.env.example`) and configure:

```env
VITE_AI_API_KEY=
VITE_AI_BASE_URL=
VITE_AI_MODEL=
```

See [`./.env.example`](./.env.example) for reference.

## 📁 Suggested Folder Structure

```text
study-assistant-ai/
├── public/
├── src/
│   ├── components/
│   ├── features/
│   │   ├── ai-tutor/
│   │   ├── planner/
│   │   ├── notes/
│   │   ├── subjects/
│   │   ├── analytics/
│   │   └── admin/
│   ├── pages/
│   ├── lib/
│   ├── hooks/
│   ├── styles/
│   └── main.tsx
├── .env.example
├── .gitignore
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── README.md
```

## 🗺️ Roadmap

- [ ] Initial React + TypeScript + Vite project bootstrap
- [ ] Authentication and role-based access
- [ ] AI tutor conversation memory and prompt templates
- [ ] Study planner with reminders and schedule intelligence
- [ ] Notes editor with tagging and search
- [ ] Dashboard KPIs and advanced analytics charts
- [ ] Admin moderation and system settings
- [ ] E2E testing and CI/CD automation

## 🤝 Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening issues or pull requests.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
