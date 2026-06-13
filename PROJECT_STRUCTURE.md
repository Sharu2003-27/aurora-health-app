# Aurora Health App - Detailed Project Structure

## Directory Layout

### Mobile Application (React Native + Expo)

```
mobile/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx                   # Email login screen
│   │   ├── signup.tsx                  # Email signup screen
│   │   ├── oauth.tsx                   # Google/Apple OAuth flow
│   │   └── _layout.tsx                 # Auth stack layout
│   │
│   ├── (onboarding)/
│   │   ├── welcome.tsx                 # Intro/landing screens
│   │   ├── personal-info.tsx           # Collect name, age, gender, etc.
│   │   ├── lifestyle.tsx               # Wake time, bedtime, activity level
│   │   ├── health-goals.tsx            # Select health goals
│   │   ├── notifications.tsx           # Notification preferences
│   │   └── _layout.tsx                 # Onboarding stack layout
│   │
│   ├── (app)/
│   │   ├── (tabs)/
│   │   │   ├── index.tsx               # Dashboard/Home screen
│   │   │   ├── hydration.tsx           # Hydration tracking
│   │   │   ├── sleep.tsx               # Sleep logging
│   │   │   ├── habits.tsx              # Habit tracking
│   │   │   ├── nutrition.tsx           # Nutrition logging
│   │   │   ├── ai.tsx                  # AI companion screen
│   │   │   └── profile.tsx             # Profile & settings
│   │   │
│   │   ├── hydration/
│   │   │   ├── [id].tsx                # Hydration detail
│   │   │   ├── history.tsx             # Hydration history
│   │   │   └── insights.tsx            # Hydration insights
│   │   │
│   │   ├── sleep/
│   │   │   ├── [id].tsx                # Sleep entry detail
│   │   │   ├── history.tsx             # Sleep history
│   │   │   └── trends.tsx              # Sleep trends
│   │   │
│   │   ├── habits/
│   │   │   ├── [id].tsx                # Habit detail
│   │   │   ├── create.tsx              # Create new habit
│   │   │   └── insights.tsx            # Habit insights
│   │   │
│   │   ├── nutrition/
│   │   │   ├── [id].tsx                # Meal detail
│   │   │   ├── log.tsx                 # Log new meal
│   │   │   └── summary.tsx             # Nutrition summary
│   │   │
│   │   ├── reports/
│   │   │   ├── weekly.tsx              # Weekly report
│   │   │   └── monthly.tsx             # Monthly report
│   │   │
│   │   └── _layout.tsx                 # Main app layout with tab navigation
│   │
│   ├── _layout.tsx                     # Root layout with auth navigation
│   └── +not-found.tsx                  # 404 page
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── OAuthButtons.tsx
│   │   └── AuthContext.tsx             # Auth provider
│   │
│   ├── health/
│   │   ├── hydration/
│   │   │   ├── WaterBottle.tsx         # Visual water bottle component
│   │   │   ├── HydrationCard.tsx
│   │   │   ├── WaterIntakeForm.tsx
│   │   │   └── QuickAddButtons.tsx
│   │   │
│   │   ├── sleep/
│   │   │   ├── SleepCard.tsx
│   │   │   ├── SleepLogForm.tsx
│   │   │   ├── SleepChart.tsx
│   │   │   └── SleepInsights.tsx
│   │   │
│   │   ├── habits/
│   │   │   ├── HabitCard.tsx
│   │   │   ├── HabitList.tsx
│   │   │   ├── HabitCreationModal.tsx
│   │   │   └── HabitProgressBar.tsx
│   │   │
│   │   └── nutrition/
│   │       ├── MealCard.tsx
│   │       ├── NutritionSummary.tsx
│   │       ├── MealForm.tsx
│   │       └── MacroBreakdown.tsx
│   │
│   ├── ai/
│   │   ├── VoiceInput.tsx              # Voice recording component
│   │   ├── VoiceOutput.tsx             # Voice playback component
│   │   ├── ChatMessage.tsx             # Chat message display
│   │   ├── ChatInterface.tsx           # Full chat UI
│   │   └── TranscriptDisplay.tsx       # Show voice transcripts
│   │
│   ├── dashboard/
│   │   ├── DashboardCard.tsx           # Reusable card component
│   │   ├── InsightCard.tsx             # Daily insight card
│   │   ├── StreakCard.tsx              # Streak display
│   │   ├── AchievementBadge.tsx        # Badge display
│   │   └── DailySummary.tsx            # Quick health summary
│   │
│   ├── common/
│   │   ├── Header.tsx                  # Page header
│   │   ├── TabBar.tsx                  # Custom tab bar
│   │   ├── Loading.tsx                 # Loading spinner
│   │   ├── EmptyState.tsx              # Empty state view
│   │   └── ErrorBoundary.tsx           # Error handling
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Picker.tsx
│       ├── SegmentedControl.tsx
│       ├── ProgressBar.tsx
│       ├── Checkbox.tsx
│       └── Alert.tsx
│
├── hooks/
│   ├── useAuth.ts                      # Authentication hook
│   ├── useHealth.ts                    # Health data hook
│   ├── useHydration.ts                 # Hydration-specific hook
│   ├── useSleep.ts                     # Sleep-specific hook
│   ├── useHabits.ts                    # Habits-specific hook
│   ├── useNutrition.ts                 # Nutrition-specific hook
│   ├── useAI.ts                        # AI companion hook
│   ├── useVoice.ts                     # Voice input/output hook
│   ├── useQuery.ts                     # TanStack Query wrapper
│   └── useOfflineSync.ts               # Offline sync hook
│
├── services/
│   ├── api.ts                          # API client configuration
│   ├── auth.service.ts                 # Authentication service
│   ├── health.service.ts               # Health data service
│   ├── hydration.service.ts            # Hydration API calls
│   ├── sleep.service.ts                # Sleep API calls
│   ├── habits.service.ts               # Habits API calls
│   ├── nutrition.service.ts            # Nutrition API calls
│   ├── ai.service.ts                   # AI companion service
│   ├── voice.service.ts                # Voice processing
│   └── notifications.service.ts        # Push notifications
│
├── store/
│   ├── authStore.ts                    # Auth state (Zustand)
│   ├── healthStore.ts                  # Health data state
│   ├── uiStore.ts                      # UI state (modals, etc.)
│   └── appStore.ts                     # General app state
│
├── constants/
│   ├── colors.ts                       # Color palette
│   ├── spacing.ts                      # Spacing values
│   ├── typography.ts                   # Font sizes and weights
│   ├── health-goals.ts                 # Available health goals
│   ├── habits.ts                       # Predefined habits
│   ├── api-endpoints.ts                # API endpoints
│   └── activity-levels.ts              # Activity level definitions
│
├── types/
│   ├── index.ts                        # Exported types
│   ├── auth.ts                         # Auth types
│   ├── health.ts                       # Health types
│   ├── hydration.ts                    # Hydration types
│   ├── sleep.ts                        # Sleep types
│   ├── habits.ts                       # Habit types
│   ├── nutrition.ts                    # Nutrition types
│   ├── ai.ts                           # AI types
│   └── api.ts                          # API response types
│
├── utils/
│   ├── formatting.ts                   # Number, date formatting
│   ├── calculations.ts                 # Health calculations
│   ├── validation.ts                   # Input validation
│   ├── storage.ts                      # AsyncStorage helpers
│   ├── voice.ts                        # Voice processing utilities
│   └── error-handler.ts                # Error handling
│
├── styles/
│   ├── theme.ts                        # Theme configuration
│   ├── global.css                      # Global styles
│   └── tailwind.config.js              # Tailwind configuration
│
├── assets/
│   ├── images/
│   │   ├── onboarding/                 # Onboarding screen images
│   │   ├── icons/                      # App icons
│   │   └── illustrations/              # Health illustrations
│   ├── sounds/
│   │   ├── success.mp3
│   │   ├── error.mp3
│   │   └── notification.mp3
│   └── fonts/
│       └── custom-fonts/               # Custom font files
│
├── app.json                            # Expo configuration
├── app.config.ts                       # App config (dynamic)
├── package.json
├── package-lock.json
├── tsconfig.json
├── babel.config.js
├── .env.example
├── .gitignore
└── README.md
```

### Backend (Node.js + Express)

```
backend/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts          # POST /auth/signup, /auth/login, etc.
│   │   │   ├── user.routes.ts          # GET/PUT /users/:id
│   │   │   ├── hydration.routes.ts     # CRUD hydration entries
│   │   │   ├── sleep.routes.ts         # CRUD sleep entries
│   │   │   ├── habits.routes.ts        # CRUD habits
│   │   │   ├── nutrition.routes.ts     # CRUD nutrition entries
│   │   │   ├── ai.routes.ts            # POST /ai/chat, /ai/voice
│   │   │   ├── insights.routes.ts      # GET /insights
│   │   │   ├── reports.routes.ts       # GET weekly/monthly reports
│   │   │   └── index.ts                # Combine all routes
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts      # Auth logic
│   │   │   ├── user.controller.ts      # User profile management
│   │   │   ├── hydration.controller.ts # Hydration CRUD
│   │   │   ├── sleep.controller.ts     # Sleep CRUD
│   │   │   ├── habits.controller.ts    # Habits CRUD
│   │   │   ├── nutrition.controller.ts # Nutrition CRUD
│   │   │   ├── ai.controller.ts        # AI companion logic
│   │   │   ├── insights.controller.ts  # Generate insights
│   │   │   └── reports.controller.ts   # Generate reports
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts      # JWT verification
│   │   │   ├── errorHandler.ts         # Global error handler
│   │   │   ├── validation.ts           # Input validation
│   │   │   ├── rateLimit.ts            # Rate limiting
│   │   │   └── cors.ts                 # CORS configuration
│   │   │
│   │   └── validators/
│   │       ├── auth.validator.ts       # Auth input validation
│   │       ├── health.validator.ts     # Health data validation
│   │       └── user.validator.ts       # User data validation
│   │
│   ├── services/
│   │   ├── auth/
│   │   │   ├── auth.service.ts         # JWT, password hashing
│   │   │   ├── oauth.service.ts        # Google/Apple OAuth
│   │   │   └── token.service.ts        # Token generation
│   │   │
│   │   ├── health/
│   │   │   ├── hydration.service.ts    # Hydration logic
│   │   │   ├── sleep.service.ts        # Sleep logic
│   │   │   ├── habits.service.ts       # Habits logic
│   │   │   ├── nutrition.service.ts    # Nutrition logic
│   │   │   └── health.service.ts       # General health logic
│   │   │
│   │   ├── ai/
│   │   │   ├── companion.service.ts    # AI companion logic
│   │   │   ├── voice.service.ts        # Voice processing (Whisper)
│   │   │   ├── agent.service.ts        # Agent actions (update data)
│   │   │   ├── memory.service.ts       # Health memory system
│   │   │   ├── insights.service.ts     # Insight generation
│   │   │   └── llm.service.ts          # LLM API integration
│   │   │
│   │   ├── notifications/
│   │   │   ├── notification.service.ts # Notification logic
│   │   │   └── scheduler.service.ts    # Notification scheduling
│   │   │
│   │   └── reports/
│   │       ├── report.service.ts       # Report generation
│   │       └── analytics.service.ts    # Analytics calculations
│   │
│   ├── models/
│   │   ├── User.ts                     # User model
│   │   ├── Hydration.ts                # Hydration model
│   │   ├── Sleep.ts                    # Sleep model
│   │   ├── Habit.ts                    # Habit model
│   │   ├── HabitCompletion.ts          # Habit completion model
│   │   ├── Nutrition.ts                # Nutrition model
│   │   ├── HealthGoal.ts               # Health goal model
│   │   ├── AIMeory.ts                  # Memory model
│   │   ├── Notification.ts             # Notification model
│   │   └── index.ts                    # Export all models
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 001_create_users_table.ts
│   │   │   ├── 002_create_health_tables.ts
│   │   │   └── 003_create_ai_tables.ts
│   │   │
│   │   ├── seeders/
│   │   │   ├── seed-health-goals.ts
│   │   │   ├── seed-habits.ts
│   │   │   └── seed-demo.ts
│   │   │
│   │   ├── config.ts                   # Database connection
│   │   ├── schema.prisma               # Prisma schema (if using Prisma)
│   │   └── index.ts                    # Database exports
│   │
│   ├── utils/
│   │   ├── logger.ts                   # Logging utility
│   │   ├── error-handler.ts            # Error handling
│   │   ├── jwt.ts                      # JWT utilities
│   │   ├── validations.ts              # Data validation
│   │   ├── calculations.ts             # Health calculations
│   │   ├── date-utils.ts               # Date utilities
│   │   └── constants.ts                # Constants
│   │
│   ├── config/
│   │   ├── env.ts                      # Environment variables
│   │   ├── database.ts                 # Database config
│   │   ├── ai.ts                       # AI provider config
│   │   └── oauth.ts                    # OAuth config
│   │
│   ├── types/
│   │   ├── index.ts                    # Exported types
│   │   ├── auth.ts                     # Auth types
│   │   ├── health.ts                   # Health types
│   │   ├── ai.ts                       # AI types
│   │   ├── api.ts                      # API response types
│   │   └── express.ts                  # Express extensions
│   │
│   ├── app.ts                          # Express app setup
│   └── index.ts                        # Entry point
│
├── tests/
│   ├── unit/                           # Unit tests
│   ├── integration/                    # Integration tests
│   └── fixtures/                       # Test data
│
├── .env.example
├── .env.test
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── jest.config.js
├── server.ts                           # Server bootstrap
├── index.ts                            # Main entry
└── README.md
```

## Key Design Patterns

### Mobile
- **Component Composition**: Reusable, focused components
- **Custom Hooks**: Logic extraction and reusability
- **State Management**: Zustand for simple state, TanStack Query for server state
- **Separation of Concerns**: Services handle API calls, components handle UI

### Backend
- **MVC Pattern**: Models, Controllers, Routes separated
- **Service Layer**: Business logic in services
- **Middleware**: Request/response pipeline
- **Error Handling**: Centralized error handling
- **Type Safety**: TypeScript for all endpoints

## Database Models (PostgreSQL)

See DATABASE.md for detailed schema.

Core entities:
- **User**: Profile, preferences, goals
- **Hydration**: Daily water intake entries
- **Sleep**: Sleep logs with duration, quality
- **Habit**: User habits with frequency
- **HabitCompletion**: Daily habit completion tracking
- **Nutrition**: Meal and macro tracking
- **AIMemory**: Stored observations about user
- **HealthGoal**: User's active health goals
- **Notification**: User notification history

## API Endpoints

See API.md for complete endpoint documentation.

Main categories:
- **Auth**: `/api/auth/*`
- **User**: `/api/users/*`
- **Health**: `/api/hydration/*`, `/api/sleep/*`, `/api/habits/*`, `/api/nutrition/*`
- **AI**: `/api/ai/chat`, `/api/ai/voice`
- **Insights**: `/api/insights/*`
- **Reports**: `/api/reports/*`
