# Task Manager Application

A full-stack task management application with authentication system built using React, Node.js, and PostgreSQL.

## Project Structure

```
simpleAuthenticationSystem/
├── frontend/              # React + Vite frontend
│   ├── src/              # Source files
│   └── .env              # Frontend environment variables
└── backend/              # Node.js + Express backend
    ├── src/              # Source files
    └── .env              # Backend environment variables
```

## Prerequisites

- Node.js (v16 or higher)
- Postgresql
- Git

## Setup Instructions

### Clone the Repository

```bash
git clone <your-repository-url>
cd simpleAuthenticationSystem
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
```env
PORT=5000

JWT_SECRET=your_jwt_secret
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:

cd frontend


2. Install dependencies:

npm install


3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

## Available Scripts

### Backend

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm test`: Run tests

### Frontend

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm test`: Run tests

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
- `POST /api/tasks` - Create new task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## Contributing

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Commit your changes:
```bash
git commit -m "Add some feature"
```

3. Push to the branch:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.