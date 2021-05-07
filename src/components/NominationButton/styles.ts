import styled from 'styled-components';

export const Container = styled.button`
  width: 120px;
  border: 0;
  background-color: #b0f4ea;
  font-size: 1rem;
  font-weight: 100;
  letter-spacing: 1px;
  border-radius: 1rem;
  margin-top: 5rem;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:disabled {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: default;
  }
`;
