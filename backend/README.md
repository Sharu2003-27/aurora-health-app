# Aurora Health App - Backend API

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 13+

### Installation

```bash
cd backend
npm install
```

### Configuration

1. Copy `.env.example` to `.env`
2. Update the following variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Random JWT secret key
   - `OPENAI_API_KEY`: Your OpenAI API key

```bash
cp .env.example .env
```

### Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed demo data (optional)
npm run db:seed
```

### Running the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/oauth` - OAuth login (Google/Apple)

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/notifications` - Update notification preferences
- `GET /api/users/metrics` - Get health metrics

### Hydration
- `POST /api/hydration` - Log water intake
- `GET /api/hydration/today` - Get today's hydration
- `GET /api/hydration/history` - Get hydration history
- `DELETE /api/hydration/:entryId` - Delete hydration entry

### Sleep
- `POST /api/sleep` - Log sleep
- `GET /api/sleep/today` - Get today's sleep
- `GET /api/sleep/history` - Get sleep history
- `PUT /api/sleep/:entryId` - Update sleep entry

### Habits
- `POST /api/habits` - Create habit
- `GET /api/habits` - Get all habits
- `GET /api/habits/today` - Get today's habits
- `POST /api/habits/:habitId/complete` - Complete habit
- `PUT /api/habits/:habitId` - Update habit
- `POST /api/habits/:habitId/pause` - Pause habit
- `DELETE /api/habits/:habitId` - Delete habit

### Nutrition
- `POST /api/nutrition` - Log meal
- `GET /api/nutrition/today` - Get today's nutrition
- `GET /api/nutrition/history` - Get nutrition history
- `DELETE /api/nutrition/:entryId` - Delete nutrition entry

### AI Companion
- `POST /api/ai/chat` - Text chat
- `POST /api/ai/voice-chat` - Voice chat
- `GET /api/ai/memories` - Get AI memories
- `POST /api/ai/memories` - Add memory

### Insights
- `GET /api/insights/daily` - Get daily insight
- `GET /api/insights/weekly` - Get weekly report

## Architecture

### Service Layer
Business logic is separated into services:
- `AuthService` - Authentication
- `UserService` - User profile management
- `HydrationService` - Hydration tracking
- `SleepService` - Sleep tracking
- `HabitService` - Habit management
- `NutritionService` - Nutrition tracking
- `CompanionService` - AI companion
- `VoiceService` - Voice processing
- `MemoryService` - AI memory system
- `AgentService` - Agent actions
- `InsightService` - Insight generation

### Middleware
- `authMiddleware` - JWT verification
- `errorHandler` - Global error handling
- `requestLogger` - Request logging

## Testing

```bash
npm test
```

## Deployment

The backend is designed to be deployed on:
- Vercel
- Railway
- Render
- AWS
- Heroku

## Environment Variables

See `.env.example` for all required variables.
