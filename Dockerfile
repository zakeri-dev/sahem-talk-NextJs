# Use the official Node.js image as the base image
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
ARG NEXT_PUBLIC_OLLAMA_URL
ARG NEXT_PUBLIC_OLLAMA_KEY
ARG NEXT_PUBLIC_OLLAMA_MODELS1
ARG NEXT_PUBLIC_OLLAMA_MODELS1_FA
ARG NEXT_PUBLIC_OLLAMA_MODELS2
ARG NEXT_PUBLIC_OLLAMA_MODELS2_FA
ENV NEXT_PUBLIC_OLLAMA_URL=$NEXT_PUBLIC_OLLAMA_URL
ENV NEXT_PUBLIC_OLLAMA_KEY=$NEXT_PUBLIC_OLLAMA_KEY
ENV NEXT_PUBLIC_OLLAMA_MODELS1=$NEXT_PUBLIC_OLLAMA_MODELS1
ENV NEXT_PUBLIC_OLLAMA_MODELS1_FA=$NEXT_PUBLIC_OLLAMA_MODELS1_FA
ENV NEXT_PUBLIC_OLLAMA_MODELS2=$NEXT_PUBLIC_OLLAMA_MODELS2
ENV NEXT_PUBLIC_OLLAMA_MODELS2_FA=$NEXT_PUBLIC_OLLAMA_MODELS2_FA
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]