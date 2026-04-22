import { useState } from 'react'
import styled from 'styled-components'
import { useVistos } from '../context/VistoContext'
import StatusBadge from '../components/StatusBadge'

const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const PageTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
`

const BotaoNovo = styled.button`
  padding: 0.65rem 1.25rem;
  background: ${({ $cancelar, theme }) => $cancelar ? 'transparent' : theme.colors.brand};
  color: ${({ $cancelar, theme }) => $cancelar ? theme.colors.textLight : 'white'};
  border: ${({ $cancelar }) => $cancelar ? '1.5px solid #DDD' : 'none'};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: opacity 0.2s;

  &:hover { opacity: 0.85; }
`

const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const FormTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
`

const Label = styled.label`
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 0.35rem;
`

const Select = styled.select`
  padding: 0.7rem 1rem;
  border: 1.5px solid #DDD;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  outline: none;
  min-width: 220px;
  cursor: pointer;

  &:focus { border-color: ${({ theme }) => theme.colors.brand}; }
`

const BotaoSalvar = styled.button`
  padding: 0.7rem 1.5rem;
  background: ${({ theme }) => theme.colors.action};
  color: #111;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: opacity 0.2s;

  &:hover { opacity: 0.85; }
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
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
`

const TIPOS = ['Turismo', 'Estudo', 'Trabalho', 'Reunião Familiar']
const FILTROS = ['Todos', 'Em Análise', 'Aprovado', 'Recusado', 'Pendente']

const FiltroBar = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`

const FiltroBtn = styled.button`
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1.5px solid ${({ $ativo, theme }) => $ativo ? theme.colors.brand : '#DDD'};
  background: ${({ $ativo, theme }) => $ativo ? theme.colors.brand : 'white'};
  color: ${({ $ativo, theme }) => $ativo ? 'white' : theme.colors.textLight};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand};
    color: ${({ $ativo, theme }) => $ativo ? 'white' : theme.colors.brand};
  }
`

export default function ProcessosScreen() {
  const { vistos, adicionarVisto } = useVistos()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [tipoSelecionado, setTipoSelecionado] = useState(TIPOS[0])
  const [filtroAtivo, setFiltroAtivo] = useState('Todos')

  const handleSalvar = () => {
    adicionarVisto(tipoSelecionado)
    setMostrarForm(false)
    setTipoSelecionado(TIPOS[0])
  }

  const ordenados = [...vistos].sort(
    (a, b) => new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao)
  )

  const filtrados = filtroAtivo === 'Todos'
    ? ordenados
    : ordenados.filter((v) => v.status === filtroAtivo)

  const formatarData = (iso) => new Date(iso).toLocaleDateString('pt-BR')

  return (
    <Page>
      <Header>
        <PageTitle>Meus Processos</PageTitle>
        <BotaoNovo $cancelar={mostrarForm} onClick={() => setMostrarForm((v) => !v)}>
          {mostrarForm ? 'Cancelar' : '+ Nova Solicitação'}
        </BotaoNovo>
      </Header>

      {mostrarForm && (
        <FormCard>
          <FormTitle>Nova Solicitação de Visto</FormTitle>
          <FormRow>
            <div>
              <Label htmlFor="tipo">Tipo de Visto</Label>
              <Select
                id="tipo"
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              >
                {TIPOS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </div>
            <BotaoSalvar onClick={handleSalvar}>Solicitar</BotaoSalvar>
          </FormRow>
        </FormCard>
      )}

      <FiltroBar>
        {FILTROS.map((f) => (
          <FiltroBtn key={f} $ativo={filtroAtivo === f} onClick={() => setFiltroAtivo(f)}>
            {f}
          </FiltroBtn>
        ))}
      </FiltroBar>

      {filtrados.length === 0 ? (
        <Empty>Nenhum processo encontrado para este filtro.</Empty>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Tipo de Visto</Th>
              <Th>Status</Th>
              <Th>Data da Solicitação</Th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((v, i) => (
              <tr key={v.id}>
                <Td style={{ color: '#999', fontSize: '0.8rem' }}>{filtrados.length - i}</Td>
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
