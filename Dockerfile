FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy workspace packages
COPY packages/shared ./packages/shared
COPY packages/backend ./packages/backend
COPY packages/frontend ./packages/frontend

# Build all packages
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and production dependencies only
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

# Copy built artifacts from builder stage
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=builder /app/packages/frontend/dist ./packages/frontend/dist

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries 3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error('Health check failed')})"

# Start server
CMD ["node", "packages/backend/dist/index.js"]
