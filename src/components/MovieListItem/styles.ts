import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: #fff;
  padding: 1rem;
  border: 1px solid #dce2e5;
  border-radius: 16px;
  margin-top: 1rem;

  span {
    display: inline-block;

    button {
      width: 120px;
      border: 0;
      background-color: #b0f4ea;
      font-size: 1rem;
      font-weight: 100;
      letter-spacing: 1px;
      border-radius: 1rem;
      margin-top: 5rem;
    }

    p {
      color: #9ca7b6;
    }
  }

  h4 {
    color: #9ca7b6;
  }

  legend {
    font-weight: 700;
    font-size: 1.4rem;
    color: #617480;
  }

  img {
    width: 100px;
    border-radius: 2rem;
  }
`;
