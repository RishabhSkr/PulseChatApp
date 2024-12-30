## Server
This is the server side of the project. It is responsible for handling the requests from the client and sending the appropriate responses.

### Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- Socket.io
- faker
- mui
- tailwindcss
- Redux/Recoil

### Installation
1. Clone the repository
2. Navigate to the server directory
3. Run `npm install`
4. Create a `.env` file in the root of the server directory and add the following environment variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-jwt-secret
```
5. Run `npm start`

### Routes
- `/api/user`
  - POST `/signup`
  - POST `/login`
  - GET `/getMe`

- `/api/chat`
    - GET `/`
    - GET `/:id`
    - PUT `/:id`
    - DELETE `/:id`
- `/api/messages`
    - GET `/`
    - GET `/:id`
    - POST `/`
    - PUT `/:id`
    - DELETE `/:id`
- `/api/comments`

### Socket Events
- `connection`
- `disconnect`
- `join`
- `leave`
- `message`
- `typing`
- `stop typing`
- `file send any kind`
- `new user`
- `user left`

### Commits
- frontened finished
- backend : api finished


### License
MIT
```