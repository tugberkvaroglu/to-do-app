const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to handle cookies
  optionsSuccessStatus: 204
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json()); // To parse JSON bodies

app.post('/api/auth/login', (req, res) => {
  // Your login logic here
  res.json({ userID: '12345', token: 'your-jwt-token' });
});

app.post('/api/auth/register', (req, res) => {
  // Your registration logic here
  res.json({ message: 'Registration successful' });
});

// Other routes and middleware
// ...

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
