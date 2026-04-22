import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { useVistos } from '../context/VistoContext'
import StatusBadge from '../components/StatusBadge'

const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`

const Boas = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
`

const GridCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
`

const SummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1.25rem 1.5rem;
`

const CardLabel = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.5rem;
`

const CardNum = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
`

const Th = styled.th`
  text-align: left;
  padding: 0.9rem 1.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 600;
  border-bottom: 1px solid #EEE;
  background: #FAFAFA;
`

const Td = styled.td`
  padding: 0.9rem 1.25rem;
  font-size: 0.9rem;
  border-bottom: 1px solid #F0F0F0;
`

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
`

export default function HomeScreen() {
  const { usuario } = useAuth()
  const { vistos } = useVistos()

  const total = vistos.length
  const emAnalise = vistos.filter((v) => v.status === 'Em Análise').length
  const aprovados = vistos.filter((v) => v.status === 'Aprovado').length

  const recentes = [...vistos]
    .sort((a, b) => new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao))
    .slice(0, 5)

  const formatarData = (iso) => new Date(iso).toLocaleDateString('pt-BR')

  return (
    <Page>
      <Boas>Olá, {usuario.nome.split(' ')[0]}!</Boas>
      <Sub>Aqui está um resumo dos seus processos de visto.</Sub>

      <GridCards>
        <SummaryCard>
          <CardLabel>Total de Solicitações</CardLabel>
          <CardNum>{total}</CardNum>
        </SummaryCard>
        <SummaryCard>
          <CardLabel>Em Análise</CardLabel>
          <CardNum $color="#F39C12">{emAnalise}</CardNum>
        </SummaryCard>
        <SummaryCard>
          <CardLabel>Aprovados</CardLabel>
          <CardNum $color="#4CB17A">{aprovados}</CardNum>
        </SummaryCard>
      </GridCards>

      <SectionTitle>Solicitações Recentes</SectionTitle>
      {recentes.length === 0 ? (
        <Empty>Nenhuma solicitação encontrada. Vá em Processos para criar uma!</Empty>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Tipo de Visto</Th>
              <Th>Status</Th>
              <Th>Data</Th>
            </tr>
          </thead>
          <tbody>
            {recentes.map((v) => (
              <tr key={v.id}>
                <Td>{v.tipoVisto}</Td>
                <Td><StatusBadge status={v.status} /></Td>
                <Td>{formatarData(v.dataSolicitacao)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Page>
  )
}
