# ─────────────────────────────────────────
# Stage 1: Build React frontend
# ─────────────────────────────────────────
FROM node:18-alpine AS client-build

WORKDIR /app/client

# Copy and install client dependencies
COPY client/package*.json ./
RUN npm install

# Copy client source and build
COPY client/ ./
RUN npm run build

# ─────────────────────────────────────────
# Stage 2: Build Node.js backend
# ─────────────────────────────────────────
FROM node:18-alpine AS server-build

WORKDIR /app/server

# Copy and install server dependencies
COPY server/package*.json ./
RUN npm install --only=production

# Copy server source
COPY server/ ./

# ─────────────────────────────────────────
# Stage 3: Final production image
# ─────────────────────────────────────────
FROM node:18-alpine

WORKDIR /app

# Copy server from stage 2
COPY --from=server-build /app/server ./server

# Copy built React app into server's public folder
COPY --from=client-build /app/client/build ./server/public

# Install serve to host static files
RUN npm install -g serve

# Expose port
EXPOSE 5000

# Start the Node.js server
CMD ["node", "server/index.js"]
