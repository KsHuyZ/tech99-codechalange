# Student CRUD API

A simple Express.js backend in TypeScript for managing students, using MongoDB for data persistence.

## Features

- Create a student
- List students with basic filters (name, enrolled)
- Get details of a student
- Update student details
- Delete a student

## Requirements

- Node.js >= 14
- npm
- MongoDB (local or remote)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure MongoDB:**

   - By default, the app connects to `mongodb://localhost:27017/studentdb`.
   - To use a different URI, set the `MONGO_URI` environment variable:
     ```bash
     export MONGO_URI="your_mongodb_uri"
     ```

3. **Run the server in development:**

   ```bash
   npm run dev
   ```

   Or, if not set up, use:

   ```bash
   npx ts-node-dev --respawn src/index.ts
   ```

4. **Build and run (production):**
   ```bash
   npm run build
   node dist/index.js
   ```

## API Endpoints

- `POST   /students` - Create a student
- `GET    /students` - List students (filters: `name`, `enrolled`)
- `GET    /students/:id` - Get student details
- `PUT    /students/:id` - Update student
- `DELETE /students/:id` - Delete student

## Example Student Object

```json
{
  "name": "John Doe",
  "age": 20,
  "email": "john@example.com",
  "enrolled": true
}
```

## Notes

- Make sure MongoDB is running before starting the server.
- The API uses JSON for request and response bodies.
