const express = require('express');

const app = express();
app.get('/', (req,res) => res.json({ msg: "Welcome to the Contact Keeper API..." }));

// Routes
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/contacts', require('./routes/ContactRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));