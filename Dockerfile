# Simple single-stage build for Coolify
FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy all packages source
COPY packages/ ./packages/

# Build all packages
RUN pnpm run build

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries 5 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error('Health check failed')})"

# Start server
CMD ["node", "packages/backend/dist/index.js"]
