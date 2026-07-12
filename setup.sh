#!/bin/bash
set -e

echo "=== Church Website - Full Stack Setup ==="
echo ""

# Check prerequisites
check_cmd() {
    if ! command -v "$1" &> /dev/null; then
        echo "ERROR: $1 is not installed."
        case "$1" in
            docker) echo "  Install Docker Desktop from https://www.docker.com/products/docker-desktop/" ;;
            java)   echo "  Install Java 21+ from https://adoptium.net/" ;;
            node)   echo "  Install Node.js 18+ from https://nodejs.org/" ;;
        esac
        exit 1
    fi
    echo "  ✓ $1 found"
}

echo "Checking prerequisites..."
check_cmd docker

echo ""
echo "Available commands:"
echo "  ./setup.sh dev          - Start development environment (Docker)"
echo "  ./setup.sh build        - Build all artifacts"
echo "  ./setup.sh seed         - Run database seed"
echo "  ./setup.sh logs         - View logs"
echo "  ./setup.sh stop         - Stop all services"
echo ""

MODE="${1:-dev}"

case "$MODE" in
    dev)
        echo "Starting development environment..."
        if [ ! -f .env ]; then
            echo "Creating .env file with default values..."
            cat > .env << 'EOF'
JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || echo "dev-secret-key-change-in-production-1234567890")
DB_PASSWORD=church_pass
EOF
        fi
        docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
        echo ""
        echo "Services starting..."
        echo "  Frontend:  http://localhost:80"
        echo "  Backend:   http://localhost:8080"
        echo "  API Docs:  http://localhost:8080/api/swagger-ui"
        echo "  Postgres:  localhost:5432"
        echo ""
        echo "  Default admin login:"
        echo "    Email:    admin@fhbck.org"
        echo "    Password: admin123"
        ;;
    build)
        echo "Building backend..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml build backend
        echo "Building frontend..."
        docker compose -f docker-compose.yml -f docker-compose.dev.yml build frontend
        ;;
    logs)
        docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
        ;;
    stop)
        docker compose -f docker-compose.yml -f docker-compose.dev.yml down
        echo "All services stopped."
        ;;
    *)
        echo "Usage: ./setup.sh [dev|build|logs|stop]"
        ;;
esac
