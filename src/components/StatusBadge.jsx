import styled from 'styled-components'

const STATUS_COLORS = {
  'Em Análise': { bg: '#FFF3CD', text: '#856404' },
  'Aprovado':   { bg: '#D1FAE5', text: '#065F46' },
  'Recusado':   { bg: '#FEE2E2', text: '#991B1B' },
  'Pendente':   { bg: '#E0E7FF', text: '#3730A3' },
}

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`

export default function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || { bg: '#EEE', text: '#555' }
  return (
    <Badge $bg={colors.bg} $color={colors.text}>
      {status}
    </Badge>
  )
}
