import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  description: number;
}

export const Container = styled(animated.div)<ContainerProps>`
  width: 500px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  background: #ebf8ff;
  color: #3172b7;

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin: 4px 25px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.description &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
