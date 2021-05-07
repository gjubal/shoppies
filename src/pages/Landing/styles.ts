import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  padding: 6rem;
`;

export const Header = styled.header`
  grid-column: 2;
  max-width: 80%;

  > div {
    margin-left: 22rem;
  }

  div {
    margin-top: 8rem;
  }
`;

export const DropdownList = styled.ul`
  height: 450px;
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: #f5f8fa;
  border: 1px solid #dce2e6;
  border-radius: 10px;
  outline: 0;
  list-style-type: none;
  padding: 1rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
`;

export const SelectionGrid = styled.main`
  grid-column: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;

  margin-top: 8rem;
`;

export const Panel = styled.section`
  width: 600px;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f8fa;
  border: 1px solid #dce2e6;
  border-radius: 1.2rem;
  outline: 0;
  padding: 2rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

  h2 {
    display: inline-block;
    border-bottom: 1px solid #dce2e6;
  }
`;
