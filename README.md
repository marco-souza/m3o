# m3o.sh

[![Go Version](https://img.shields.io/github/go-mod/go-version/marco-souza/m3o.sh)](https://golang.org/)
[![License](https://img.shields.io/github/license/marco-souza/m3o.sh)](LICENSE)
[![Powered by PocketBase](https://img.shields.io/badge/powered%20by-PocketBase-blue.svg)](https://pocketbase.io/)

This is a [PocketBase](https://pocketbase.io/) project called `m3o.sh`.

## Features

- **PocketBase Backend**: A complete backend in a single file.
- **Custom `/hello` Endpoint**: A simple endpoint that returns "Hello world!".
- **Custom `hello` CLI Command**: A command that prints "Hello from CLI".
- **Cron Job**: A cron job that prints "Hello!" every 2 minutes.
- **Static File Serving**: Serves static files from the `pb_public` directory.

## Getting Started

### Prerequisites

- [Go](https://golang.org/doc/install)
- [Docker](https://docs.docker.com/get-docker/) (optional)

### Running with Go

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/marco-souza/m3o.sh.git
    cd m3o.sh
    ```

2.  **Install dependencies:**

    ```bash
    go mod tidy
    ```

3.  **Run the application:**

    ```bash
    go run main.go serve
    ```

### Running with Docker

1.  **Build the Docker image:**

    ```bash
    docker build -t m3o.sh .
    ```

2.  **Run the Docker container:**

    ```bash
    docker run -p 8080:8080 m3o.sh
    ```

## Usage

- **API Endpoint**: Access the `/hello` endpoint at `http://localhost:8080/hello`.
- **CLI Command**: Run the `hello` command with `go run main.go hello`.

## Stack

This project uses:

- **Go**: The primary programming language.
- **PocketBase**: As the backend framework.
- **Node.js**: For dependency management and running scripts.
- **Lefthook**: For git hooks management.
- **Prettier**: To format markdown files.

## Development

To contribute to this project, you need to have the following installed:

- [Go](https://golang.org/doc/install)
- [Node.js](https://nodejs.org/en/download/) (which includes `npx`)

To ensure code quality and consistency, this project uses [Lefthook](https://github.com/evilmartians/lefthook) to manage git hooks.

To get started, install our dependencies:

```bash
go install github.com/evilmartians/lefthook@latest
```

Then, install the git hooks:

```bash
lefthook install
```
