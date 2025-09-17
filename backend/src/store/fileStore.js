'use strict'

const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '..', '..', 'data')

function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  const defaults = {
    users: { users: [] },
    products: { products: sampleProducts() },
    carts: { carts: [] }
  }
  for (const [name, value] of Object.entries(defaults)) {
    const file = path.join(dataDir, `${name}.json`)
    if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(value, null, 2))
  }
}

function sampleProducts() {
  return [
    { id: 'p1', name: 'HAVIT HV-G92 Gamepad', price: 120 },
    { id: 'p2', name: 'AK-900 Wired Keyboard', price: 960 },
    { id: 'p3', name: 'IPS LCD Gaming Monitor', price: 370 },
    { id: 'p4', name: 'S-Series Comfort Chair', price: 375 },
  ]
}

async function readJson(name) {
  const file = path.join(dataDir, `${name}.json`)
  const raw = await fs.promises.readFile(file, 'utf8')
  return JSON.parse(raw)
}

async function writeJson(name, data) {
  const file = path.join(dataDir, `${name}.json`)
  await fs.promises.writeFile(file, JSON.stringify(data, null, 2))
}

module.exports = { ensureDataFiles, readJson, writeJson }


