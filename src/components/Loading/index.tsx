import { CircleNotch } from 'phosphor-react'
import { LoadingContainer } from './styles'

export function Loading() {
  return (
    <LoadingContainer>
      <CircleNotch size={32} />
    </LoadingContainer>
  )
}
