'use strict'

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const { readJson, writeJson, ensureDataFiles } = require('../store/fileStore')

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

ensureDataFiles()

const authRouter = express.Router()

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
})

authRouter.post('/register', async (req, res) => {
  const parse = registerSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload', details: parse.error.errors })
  const { name, email, password } = parse.data
  const db = await readJson('users')
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (existing) return res.status(409).json({ error: 'Email already registered' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), name, email, passwordHash }
  db.users.push(user)
  await writeJson('users', db)
  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' })
  res.status(201).json({ user: { id: user.id, name, email }, token })
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

authRouter.post('/login', async (req, res) => {
  const parse = loginSchema.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid payload', details: parse.error.errors })
  const { email, password } = parse.data
  const db = await readJson('users')
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token })
})

module.exports = { authRouter }


