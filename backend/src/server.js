'use strict'

const express = require('express')
const cors = require('cors')

const { authRouter } = require('./routes/auth')
const { productsRouter } = require('./routes/products')
const { cartRouter } = require('./routes/cart')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})


