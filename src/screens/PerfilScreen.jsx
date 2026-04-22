import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { useVistos } from '../context/VistoContext'

const Page = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`

const PageTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 2rem;
  margin-bottom: 1.5rem;
`

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.brand};
  color: white;
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

const Nome = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`

const Email = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #EEE;
  margin-bottom: 1.5rem;
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
`

const StatBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`

const StatNum = styled.p`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`

const StatLabel = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 0.2rem;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.65rem 0;
  border-bottom: 1px solid #F5F5F5;
  font-size: 0.9rem;

  &:last-child { border-bottom: none; }
`

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`

const InfoValue = styled.span`
  font-weight: 600;
`

export default function PerfilScreen() {
  const { usuario } = useAuth()
  const { vistos } = useVistos()

  const inicial = usuario.nome.charAt(0).toUpperCase()
  const total = vistos.length
  const aprovados = vistos.filter((v) => v.status === 'Aprovado').length
  const recusados = vistos.filter((v) => v.status === 'Recusado').length
  const emAnalise = vistos.filter((v) => v.status === 'Em Análise').length

  return (
    <Page>
      <PageTitle>Meu Perfil</PageTitle>

      <Card>
        <Avatar>{inicial}</Avatar>
        <Nome>{usuario.nome}</Nome>
        <Email>{usuario.email}</Email>
        <Divider />
        <InfoRow>
          <InfoLabel>ID do usuário</InfoLabel>
          <InfoValue>#{String(usuario.id).padStart(4, '0')}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Email</InfoLabel>
          <InfoValue>{usuario.email}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Status da conta</InfoLabel>
          <InfoValue style={{ color: '#065F46' }}>Ativa</InfoValue>
        </InfoRow>
      </Card>

      <Card>
        <Nome style={{ fontSize: '1rem', marginBottom: '1rem' }}>Resumo dos processos</Nome>
        <StatGrid>
          <StatBox>
            <StatNum>{total}</StatNum>
            <StatLabel>Total</StatLabel>
          </StatBox>
          <StatBox>
            <StatNum $color="#F39C12">{emAnalise}</StatNum>
            <StatLabel>Em Análise</StatLabel>
          </StatBox>
          <StatBox>
            <StatNum $color="#4CB17A">{aprovados}</StatNum>
            <StatLabel>Aprovados</StatLabel>
          </StatBox>
          <StatBox>
            <StatNum $color="#E74C3C">{recusados}</StatNum>
            <StatLabel>Recusados</StatLabel>
          </StatBox>
        </StatGrid>
      </Card>
    </Page>
  )
}
