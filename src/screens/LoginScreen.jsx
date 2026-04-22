import { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
`

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.brand};
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.25rem;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.4rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid ${({ $erro, theme }) => $erro ? theme.colors.danger : '#DDD'};
  border-radius: 8px;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  outline: none;
  margin-bottom: 1.25rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.brand};
  }
`

const Erro = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.85rem;
  text-align: center;
  margin-bottom: 1rem;
`

const BotaoLogin = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: ${({ theme }) => theme.colors.brand};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: opacity 0.2s;

  &:hover { opacity: 0.9; }
  &:active { opacity: 0.8; }
`

const Dica = styled.div`
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: #F0FBF5;
  border-radius: 8px;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
`

export default function LoginScreen() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }
    const ok = login(email, senha)
    if (!ok) setErro('Email ou senha incorretos.')
  }

  return (
    <Page>
      <Card>
        <Logo>YouVisa</Logo>
        <Subtitle>Plataforma de Gestão de Vistos</Subtitle>

        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErro('') }}
            $erro={!!erro}
          />

          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            type="password"
            placeholder="••••••"
            value={senha}
            onChange={(e) => { setSenha(e.target.value); setErro('') }}
            $erro={!!erro}
          />

          {erro && <Erro>{erro}</Erro>}

          <BotaoLogin type="submit">Entrar</BotaoLogin>
        </form>

        <Dica>
          <strong>Contas de teste:</strong><br />
          ana@youvisa.com / 123456<br />
          joao@youvisa.com / 123456<br />
          maria@youvisa.com / 123456
        </Dica>
      </Card>
    </Page>
  )
}
