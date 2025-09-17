import axios from 'axios'

const API_URL = import.meta?.env?.VITE_API_URL || 'http://localhost:4000'

function getToken() {
  try { return localStorage.getItem('token') || '' } catch { return '' }
}

const client = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
})

client.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const errorPayload = err?.response?.data || { error: err.message || 'Request failed' }
    return Promise.reject(errorPayload)
  }
)

export async function apiGet(path) {
  const res = await client.get(path)
  return res.data
}

export async function apiPost(path, body, withAuth = false) {
  // withAuth is preserved for signature compatibility (token is auto-attached)
  const res = await client.post(path, body)
  return res.data
}

export function saveAuthToken(token) {
  try { localStorage.setItem('token', token) } catch {}
}

export async function apiDelete(path) {
  const res = await client.delete(path)
  return res.data
}


