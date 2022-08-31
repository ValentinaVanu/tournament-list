import styled from 'styled-components';
import theme from '../theme';

interface ITournamentCard {
  isSingle: boolean;
}

export const StyledTournamentCard = styled.div<ITournamentCard>`
  border-radius: 4px;
  padding: ${theme.spacing(4.5)};
  background-color: ${theme.palette.background.base};
  color: ${theme.palette.text.primary};
  max-width: ${({ isSingle }) => (isSingle ? '268px' : '100%')};
`;

export const TournamentsContainer = styled.div`
  display: grid;
  grid-gap: ${theme.spacing(6)};
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(268px, 1fr));
`;
