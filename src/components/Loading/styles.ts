import styled from 'styled-components'

export const LoadingContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  animation: spin 2s linear infinite;

  svg {
    color: ${(props) => props.theme['gray-300']};
  }
`
