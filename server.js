const express = require('express')
const connectDB = require('./config/Database')
const userRoutes = require('./routes/UserRoutes')
const authRoutes = require('./routes/AuthRoutes')
const contactRoutes = require('./routes/ContactRoutes')

const startServer = () => {
  const app = express()

  // Configure JSON body parser
  app.use(express.json({ extended: false }))

  // Routes
  app.get('/', (req, res) => res.json({ msg: 'Welcome to the Contact Keeper API...' }))
  app.use('/api/users', userRoutes)
  app.use('/api/auth', authRoutes)
  app.use('/api/contacts', contactRoutes)

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

// Connect DB and then start the server.
connectDB()
  .then(startServer)
