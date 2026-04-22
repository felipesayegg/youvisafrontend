import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const SEED_DATA = {
  1: [
    { id: '1a', tipoVisto: 'Turismo', status: 'Aprovado', dataSolicitacao: '2025-11-10T10:00:00Z' },
    { id: '1b', tipoVisto: 'Estudo', status: 'Em Análise', dataSolicitacao: '2026-01-15T08:30:00Z' },
  ],
  2: [
    { id: '2a', tipoVisto: 'Trabalho', status: 'Pendente', dataSolicitacao: '2026-02-20T14:00:00Z' },
  ],
  3: [
    { id: '3a', tipoVisto: 'Reunião Familiar', status: 'Aprovado', dataSolicitacao: '2025-09-05T09:00:00Z' },
    { id: '3b', tipoVisto: 'Turismo', status: 'Recusado', dataSolicitacao: '2025-12-01T11:00:00Z' },
    { id: '3c', tipoVisto: 'Estudo', status: 'Em Análise', dataSolicitacao: '2026-03-10T16:00:00Z' },
  ],
}

const VistoContext = createContext(null)

export function VistoProvider({ children }) {
  const { usuario } = useAuth()
  const [vistos, setVistos] = useState([])
  const [feedback, setFeedback] = useState('')
  const storageKey = `youvisa_vistos_${usuario?.id}`

  useEffect(() => {
    if (!usuario) return
    const salvo = localStorage.getItem(storageKey)
    if (salvo) {
      setVistos(JSON.parse(salvo))
    } else {
      const inicial = SEED_DATA[usuario.id] || []
      setVistos(inicial)
      localStorage.setItem(storageKey, JSON.stringify(inicial))
    }
  }, [usuario, storageKey])

  const adicionarVisto = (tipoVisto) => {
    const novo = {
      id: Date.now().toString(),
      tipoVisto,
      status: 'Em Análise',
      dataSolicitacao: new Date().toISOString(),
    }
    const atualizado = [...vistos, novo]
    setVistos(atualizado)
    localStorage.setItem(storageKey, JSON.stringify(atualizado))
    setFeedback(`Solicitação de visto "${tipoVisto}" registrada com sucesso!`)
    setTimeout(() => setFeedback(''), 3500)
  }

  return (
    <VistoContext.Provider value={{ vistos, adicionarVisto, feedback }}>
      {children}
    </VistoContext.Provider>
  )
}

export const useVistos = () => useContext(VistoContext)
