import styled from 'styled-components';
import theme from '../theme';

export const Container = styled.div`
  max-width: 960px;
  margin-top: ${theme.spacing(6)};
  margin-left: auto;
  margin-right: auto;
`;

export const HeaderContainer = styled.div`
  margin-bottom: ${theme.spacing(6)};
  display: flex;
  justify-content: space-between;
`;

export const UpdateMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
