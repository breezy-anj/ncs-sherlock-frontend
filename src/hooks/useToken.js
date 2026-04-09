import { useState } from 'react'

export default function useToken() {
  const [token, setTokenState] = useState(
    () => localStorage.getItem('sherlocked_token') || ''
  )
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sherlocked_user') || 'null')
    } catch {
      return null
    }
  })

  const setToken = (t, u) => {
    localStorage.setItem('sherlocked_token', t)
    localStorage.setItem('sherlocked_user', JSON.stringify(u))
    setTokenState(t)
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('sherlocked_token')
    localStorage.removeItem('sherlocked_user')
    setTokenState('')
    setUser(null)
  }

  return { token, user, setToken, logout }
}
