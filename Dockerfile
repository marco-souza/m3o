# builder stage
FROM golang:1.24-alpine AS builder

WORKDIR /app

# install dependencies
COPY go.mod go.sum ./
RUN go mod download

# copy source code
COPY . .

# build the application
RUN CGO_ENABLED=0 go build -o /app/m3o .

# development stage
FROM builder AS development

RUN go install github.com/air-verse/air@latest
CMD ["air", "-c", ".air.toml"]

# production stage
FROM alpine:latest AS production

WORKDIR /app

COPY --from=builder /app/m3o .
COPY pb_public ./pb_public

EXPOSE 8090

CMD ["/app/m3o", "serve", "--http", "0.0.0.0:8090"]
