import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 800px;
  background: #ffffff;
  width: 100%;
  max-width: 800px;
  border: 1px solid #dce2e5;
  border-radius: 16px;
  margin: 20px 0;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 14px;
    font-weight: 400;
    margin-top: 40px;
    margin-bottom: 18px;
  }

  legend {
    max-width: 50%;

    font-weight: 700;
    font-size: 1rem;
    color: #617480;
  }

  p {
    font-size: 0.8rem;
    color: #617480;
  }

  img {
    height: 80px;
    width: 80px;
    border-radius: 2rem;
    object-fit: cover;
  }

  div {
    display: flex;

    button {
      background: none;
      border: 0;
      color: #69cf9c;
      transition: color 0.2s;

      &:hover {
        background: ${shade(0.2, '#fff')};
      }
    }
  }
`;
