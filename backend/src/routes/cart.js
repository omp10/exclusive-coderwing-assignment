'use strict'

const express = require('express')
const { z } = require('zod')
const jwt = require('jsonwebtoken')
const { readJson, writeJson } = require('../store/fileStore')

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = { id: payload.sub, email: payload.email, name: payload.name }
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

const cartRouter = express.Router()

// GET /api/cart - fetch current user's cart
cartRouter.get('/', requireAuth, async (req, res) => {
  const carts = await readJson('carts')
  const cart = carts.carts.find(c => c.userId === req.user.id) || { userId: req.user.id, items: [] }
  res.json({ cart })
})

// POST /api/cart - add item to cart
const addSchema = z.object({ productId: z.string(), quantity: z.number().int().min(1) })
cartRouter.post('/', requireAuth, async (req, res) => {
  const parsed = addSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload', details: parsed.error.errors })
  const { productId, quantity } = parsed.data

  const productsDb = await readJson('products')
  const product = productsDb.products.find(p => p.id === productId)
  if (!product) return res.status(404).json({ error: 'Product not found' })

  const cartsDb = await readJson('carts')
  let cart = cartsDb.carts.find(c => c.userId === req.user.id)
  if (!cart) {
    cart = { userId: req.user.id, items: [] }
    cartsDb.carts.push(cart)
  }
  const existing = cart.items.find(i => i.productId === productId)
  if (existing) existing.quantity += quantity
  else cart.items.push({ productId, quantity })
  await writeJson('carts', cartsDb)
  res.status(201).json({ cart })
})

module.exports = { cartRouter }


