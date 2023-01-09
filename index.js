require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const corsConfig = require('./config/corsConfig')
const cors = require('cors')

app.use(express.json())
app.use(cors(corsConfig))

app.use('/playlists', require('./routes/playlistRoutes'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
