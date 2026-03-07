FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies (includes workspaces)
RUN pnpm install --frozen-lockfile

# Copy all packages source code
COPY packages/ ./packages/

# Build all packages using turbo
RUN pnpm run build

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3000

# Health check with longer startup time
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=10 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error('Health check failed')})"

# Start backend server
CMD ["node", "packages/backend/dist/index.js"]
