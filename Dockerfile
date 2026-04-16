FROM node:20-alpine

# Native dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./

# Install pnpm globally (pin version)
RUN npm install -g pnpm@9

# Install all dependencies including devDeps (turbo is a devDep)
# Generate fresh lockfile in Docker to avoid version mismatches
RUN rm -f pnpm-lock.yaml && NODE_ENV=development pnpm install --ignore-scripts

# Copy all packages source code
COPY packages/ ./packages/

# Build all packages using turbo
RUN NODE_ENV=development pnpm run build

# Strip devDependencies for production
RUN pnpm install --prod

# Expose port
EXPOSE 3000

# Health check with longer startup time
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=10 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error('Health check failed')})"

# Start backend server
CMD ["node", "packages/backend/dist/index.js"]
