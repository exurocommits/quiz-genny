# Quiz Genny - Docker Deployment

This Dockerfile builds the Quiz Genny application using pnpm workspaces.

## Build Process
1. Install pnpm globally
2. Install all dependencies with workspaces
3. Copy source code for all packages
4. Build all packages using turbo
5. Install production dependencies
6. Start backend server

## Environment Variables Required
- `DATABASE_URL` - Supabase database connection string
- `OPENAI_API_KEY` - OpenAI API key for AI generation
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret

## Ports
- 3000 - Backend API server

## Health Check
- Endpoint: /api/health
- Returns: { status: 'healthy', timestamp, uptime }
