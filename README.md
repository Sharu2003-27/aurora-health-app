# Aurora – Mobile Health Companion

A mobile-first health companion application designed to help users understand their health through hydration tracking, sleep tracking, habit building, nutrition awareness, personalized insights, and an intelligent AI health companion.

## 🎯 Project Overview

Aurora combines health tracking with personalized AI-powered insights to create a personal health companion experience that users will want to use daily.

### Core Features

✅ **Health Tracking**
- Hydration tracking with visual water bottle
- Sleep logging and analysis
- Habit formation and streaks
- Nutrition awareness

✅ **Personalized Insights**
- AI-powered daily health recommendations
- Weekly and monthly progress reports
- Health memory system (understands user patterns)

✅ **Voice AI Companion** (Core Feature)
- Voice-to-voice interaction
- Natural conversation about health
- Agent actions (logging data through conversation)
- Personalized recommendations

✅ **Authentication**
- Email signup/login
- Google OAuth
- Apple OAuth

✅ **User Onboarding**
- Personal information collection
- Health goals setup
- Notification preferences

✅ **Gamification**
- Streak tracking
- Badges and achievements
- Progress visualization

## 🏗️ Project Architecture

```
📦 aurora-health-app/
├── 📱 mobile/                          # React Native + Expo Frontend
│   ├── app/
│   │   ├── (auth)/                     # Authentication screens
│   │   ├── (app)/                      # Main app screens (tab navigator)
│   │   ├── (onboarding)/               # Onboarding flow
│   │   └── _layout.tsx                 # Root layout with routing
│   ├── components/
│   │   ├── auth/
│   │   ├── health/
│   │   ├── ai/
│   │   ├── common/
│   │   └── ui/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── constants/
│   ├── types/
│   ├── utils/
│   ├── app.json                        # Expo config
│   ├── package.json
│   ├── tsconfig.json
│   └── babel.config.js
│
├── 🔧 backend/                         # Node.js + Express Backend
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   └── validators/
│   │   ├── services/
│   │   │   ├── auth/
│   │   │   ├── health/
│   │   │   ├── ai/
│   │   │   └── notifications/
│   │   ├── models/
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   ├── seeders/
│   │   │   └── config.ts
│   │   ├── utils/
│   │   ├── config/
│   │   ├── types/
│   │   └── app.ts                      # Express app
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── server.ts
│   └── index.ts
│
├── 📚 docs/                            # Documentation
│   ├── API.md                          # API documentation
│   ├── ARCHITECTURE.md                 # Architecture details
│   ├── SETUP.md                        # Setup instructions
│   └── DATABASE.md                     # Database schema
│
└── .env.example                        # Environment variables template
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL or MongoDB
- OpenAI API key (or alternative AI provider)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file with database and AI credentials
npm run dev
```

### Mobile Setup

```bash
cd mobile
npm install
# Create app.json with your configuration
npm start
# Scan QR code with Expo Go app
```

## 📱 Tech Stack

### Mobile
- **React Native** + **Expo** - Cross-platform mobile development
- **Expo Router** - File-based routing
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **TypeScript** - Type safety
- **Nativewind/Tailwind** - Styling
- **React Native Voice** - Voice input
- **Expo AV** - Audio output

### Backend
- **Node.js** + **Express** - API server
- **TypeScript** - Type safety
- **PostgreSQL** + **Prisma ORM** - Database
- **OpenAI/Anthropic** - AI integration
- **JWT** - Authentication
- **Zod** - Input validation

### AI/Voice
- **OpenAI Whisper** - Speech-to-text
- **OpenAI GPT-4/Claude** - AI companion reasoning
- **Text-to-Speech API** - Voice responses

## 📖 Documentation

- [API Documentation](./docs/API.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Instructions](./docs/SETUP.md)

## 🎨 Design Principles

- **Personal**: Feels like your own health coach
- **Intelligent**: AI understands your patterns and preferences
- **Supportive**: Encouraging without being stressful
- **Premium**: Modern, clean, delightful interactions
- **Simple**: No unnecessary complexity

## 📊 Features Breakdown

### Phase 1 (MVP)
- [x] Authentication (Email, Google, Apple)
- [x] User onboarding
- [x] Hydration tracking
- [x] Sleep logging
- [x] Habit tracking
- [x] Dashboard
- [x] Voice AI companion (basic)

### Phase 2 (Enhanced)
- [ ] Nutrition tracking
- [ ] Advanced AI memory system
- [ ] Weekly/monthly reports
- [ ] Streak system with badges
- [ ] Notifications
- [ ] Device integrations (optional)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Mobile tests
cd mobile
npm run test
```

## 🔒 Security

- JWT-based authentication
- Environment variable configuration
- Input validation with Zod
- Rate limiting on API endpoints
- HTTPS enforced in production
- Secure password hashing

## 📝 License

MIT

## 🤝 Contributing

This is a hackathon project. For contributions, please follow the established code style and patterns.

---

**Built with ❤️ for better health**
