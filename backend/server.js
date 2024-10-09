const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// Use user routes
app.use('/api', userRoutes);

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Employee Registration API');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

