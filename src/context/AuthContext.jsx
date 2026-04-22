import { createContext, useContext, useEffect, useState } from 'react'

const MOCK_USERS = [
  { id: 1, email: 'ana@youvisa.com', senha: '123456', nome: 'Ana Silva' },
  { id: 2, email: 'joao@youvisa.com', senha: '123456', nome: 'João Santos' },
  { id: 3, email: 'maria@youvisa.com', senha: '123456', nome: 'Maria Oliveira' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const salvo = localStorage.getItem('youvisa_usuario')
    if (salvo) setUsuario(JSON.parse(salvo))
    setCarregando(false)
  }, [])

  const login = (email, senha) => {
    const encontrado = MOCK_USERS.find(
      (u) => u.email === email && u.senha === senha
    )
    if (!encontrado) return false
    setUsuario(encontrado)
    localStorage.setItem('youvisa_usuario', JSON.stringify(encontrado))
    return true
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('youvisa_usuario')
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
