const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:5173',
  'https://playlist-sharing.vercel.app',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://playlist-sharing.netlify.app',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

module.exports = corsOptions
