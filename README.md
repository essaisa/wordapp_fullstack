# Prerequisites

Node.js >= 18.x
Docker & Docker Compose
npm

# Setup

Download the ZIP file in documentation 


## Start PostgreSQL with Docker Compose:
docker-compose up -d

This will spin up a PostgreSQL container with the database defined in your docker-compose.yml

## Install server dependencies:

cd server
npm install


## Configure environment variables (.env):
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
JWT_SECRET=your_secret_key


## Generate Prisma client:
npx prisma generate


## Run migrations to create tables:
npx prisma migrate dev


## Start server:
npm run dev


## Start frontend:
cd ../frontend
npm install
npm start

# Testing
Unit Tests: Run npm test in the server and client's tests folders.

