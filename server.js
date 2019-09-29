const express = require('express');

const connectDB = require('./config/Database');

const startServer = () => {
    const app = express();

    // Configure JSON body parser
    app.use(express.json({ extended: false }));
  
    // Routes
    app.get('/', (req,res) => res.json({ msg: "Welcome to the Contact Keeper API..." }));
    app.use('/api/users', require('./routes/UserRoutes'));
    app.use('/api/auth', require('./routes/AuthRoutes'));
    app.use('/api/contacts', require('./routes/ContactRoutes'));
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

// Connect DB and then start the server.
connectDB()
    .then(startServer);