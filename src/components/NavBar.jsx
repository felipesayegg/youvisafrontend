import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
`

const Logo = styled.span`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.brand};
`

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`

const NavBtn = styled.button`
  padding: 0.45rem 1rem;
  border-radius: 8px;
  border: none;
  background: ${({ $ativo, theme }) => $ativo ? theme.colors.brand : 'transparent'};
  color: ${({ $ativo, theme }) => $ativo ? 'white' : theme.colors.textLight};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: all 0.15s;

  &:hover {
    background: ${({ $ativo, theme }) => $ativo ? theme.colors.brand : '#F0F0F0'};
  }
`

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const UserName = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`

const BotaoSair = styled.button`
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  border: 1.5px solid #DDD;
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: all 0.15s;

  &:hover {
    background: #FFF0EE;
    border-color: ${({ theme }) => theme.colors.danger};
  }
`

export default function NavBar({ tela, setTela }) {
  const { usuario, logout } = useAuth()

  return (
    <Nav>
      <Logo>YouVisa</Logo>
      <NavLinks>
        <NavBtn $ativo={tela === 'home'} onClick={() => setTela('home')}>
          Home
        </NavBtn>
        <NavBtn $ativo={tela === 'processos'} onClick={() => setTela('processos')}>
          Processos
        </NavBtn>
        <NavBtn $ativo={tela === 'perfil'} onClick={() => setTela('perfil')}>
          Perfil
        </NavBtn>
      </NavLinks>
      <UserArea>
        <UserName>{usuario?.nome}</UserName>
        <BotaoSair onClick={logout}>Sair</BotaoSair>
      </UserArea>
    </Nav>
  )
}
