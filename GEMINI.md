# Gemini Project Context

This document provides context for the Gemini agent to understand and interact with this project.

## Project Overview

This is a Go project that uses the [PocketBase](https://pocketbase.io/) framework. PocketBase is an open-source Go backend that provides a realtime database, authentication, file storage, and an admin dashboard in a single executable.

The project is named `m3o.sh` and is configured with:

- A custom API endpoint at `/hello`.
- A custom CLI command `hello`.
- A cron job that runs every two minutes.
- Static file serving from the `pb_public` directory.

## Project Structure

- `main.go`: The main entry point of the application. It initializes and configures the PocketBase instance.
- `go.mod`, `go.sum`: Go module files that manage project dependencies.
- `pb_public/`: Directory for static assets served by the application.
- `pb_data/`: Directory where PocketBase stores its data (e.g., SQLite database).
- `Dockerfile`: For building the application into a Docker container.
- `docker-compose.yml`: For running the application and related services using Docker Compose.
- `.air.toml`: Configuration file for `air`, a live-reloading tool for Go applications.

## Running the Application

There are two primary ways to run this application:

### 1. Using Go

This is the recommended method for development.

- **Run the server:**
  ```bash
  go run main.go serve
  ```
- **Run the custom CLI command:**
  ```bash
  go run main.go hello
  ```

### 2. Using Docker

This is suitable for production or containerized environments.

- **Build and run with Docker:**
  ```bash
  docker build -t m3o.sh .
  docker run -p 8090:8090 m3o.sh
  ```
- **Run with Docker Compose:**
  ```bash
  docker-compose up
  ```
