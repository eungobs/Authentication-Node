const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/api', userRoutes);

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Employee Registration API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
