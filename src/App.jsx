import { useState } from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { AuthProvider, useAuth } from './context/AuthContext'
import { VistoProvider } from './context/VistoContext'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import ProcessosScreen from './screens/ProcessosScreen'
import NavBar from './components/NavBar'

const theme = {
  colors: {
    brand: '#4CB17A',
    action: '#34E370',
    background: '#F5F5F7',
    white: '#FFFFFF',
    text: '#000000',
    textLight: '#555555',
    danger: '#E74C3C',
    warning: '#F39C12',
  },
  fonts: { primary: 'Inter, sans-serif' },
  shadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
  }
`

function AppContent() {
  const { usuario, carregando } = useAuth()
  const [tela, setTela] = useState('home')

  if (carregando) return null

  if (!usuario) return <LoginScreen />

  const renderTela = () => {
    if (tela === 'processos') return <ProcessosScreen />
    return <HomeScreen />
  }

  return (
    <VistoProvider>
      <NavBar tela={tela} setTela={setTela} />
      {renderTela()}
    </VistoProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
