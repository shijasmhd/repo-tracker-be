# RepoTracker Backend

This is the backend for the RepoTracker application, built with Express.js, MySQL, and Prisma ORM.

## Features

- User authentication and authorization
- Bookmark management
- CSV parsing for bulk bookmark uploads
- GitHub API integration

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MySQL (v5.7 or later)

## Setup

1. Clone the repository:

```bash
https://github.com/shijasmhd/repo-tracker-be.git
cd repo-tracker-be
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

- Copy the `.env.example` file to `.env`
- Change the necessary environment variables
- By default PORT is 8080, if you are changing please change in frontend sr/config as well

4. Set up the database:

```bash
npx prisma migrate dev --name init
```

## Running the App

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default is 8080).

## API Endpoints

- POST `/api/v1/auth/register` - User registration

## API Endpoints

- POST `/api/v1/auth/register` - User registration
- POST `/api/v1/auth/login` - User login
- POST `/api/v1/users/:userId/bookmarks` - Add a bookmark
- POST `/api/v1/users/:userId/bookmarks/upload` - Upload CSV of bookmarks
- GET `/api/v1/users/:userId/bookmarks` - Get user's bookmarks
- GET `/api/v1/users/:userId/bookmarks/stats` - Get bookmark statistics
- DELETE `/api/v1/users/:userId/bookmarks/:bookmarkId` - Remove a bookmark

## Project Structure

- `src/`
  - `controllers/` - Request handlers
  - `middlewares/` - Custom middleware functions
  - `models/` - Prisma schema and model definitions
  - `routes/` - API route definitions
  - `services/` - Business logic
  - `utils/` - Utility functions
  - `validations/` - Request validation schemas
  - `index.js` - Entry point

## Dependencies

- Express.js
- Prisma ORM
- Passport.js
- JSON Web Token (JWT)
- bcrypt
- Joi
- csv-parser
- multer

For a full list of dependencies, see `package.json`.

## Database Migrations

To create a new migration after changing the Prisma schema:

```bash
npx prisma migrate dev
```

To apply migrations in production:

```bash
npx prisma migrate deploy
```
