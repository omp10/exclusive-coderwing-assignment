'use strict'

const express = require('express')
const { readJson } = require('../store/fileStore')

const productsRouter = express.Router()

// GET /api/products
productsRouter.get('/', async (_req, res) => {
  const db = await readJson('products')
  res.json({ products: db.products })
})

// GET /api/products/:id
productsRouter.get('/:id', async (req, res) => {
  const db = await readJson('products')
  const product = db.products.find(p => p.id === req.params.id)
  if (!product) return res.status(404).json({ error: 'Not found' })
  res.json({ product })
})

module.exports = { productsRouter }


