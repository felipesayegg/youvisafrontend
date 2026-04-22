import styled, { keyframes } from 'styled-components'
import { useVistos } from '../context/VistoContext'

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Toast = styled.div`
  position: fixed;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  background: #065F46;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0px 4px 16px rgba(0,0,0,0.18);
  z-index: 999;
  animation: ${slideIn} 0.25s ease;
  white-space: nowrap;
`

export default function FeedbackToast() {
  const { feedback } = useVistos()
  if (!feedback) return null
  return <Toast>{feedback}</Toast>
}
