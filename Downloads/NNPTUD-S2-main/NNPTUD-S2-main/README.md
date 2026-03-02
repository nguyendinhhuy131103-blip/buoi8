# NNPTUD-S2
Lớp NNPTUD-Sáng t2

## Setup & Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Make sure MongoDB is running locally or set `MONGO_URI` env var.
3. Start server:

   ```bash
   npm start
   ```

   or in development with hot reload:

   ```bash
   npm run dev
   ```

4. The API will be available at `http://localhost:3000`.

   - `POST /users` create user
   - `GET /users` list users
   - `GET /users/:id` get user by id
   - `PUT /users/:id` update user
   - `DELETE /users/:id` soft delete user
   - `POST /enable` body `{ email, username }` to enable
   - `POST /disable` body `{ email, username }` to disable

   Similar routes exist for `/roles`.
