import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useDispatch, Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import H4 from './components/H4';
import Input from './components/Input';
import { Button } from './components/Button';
import { useDebounce } from './hooks/useDebounce';
import { Container, HeaderContainer } from './components/Container';
import { TournamentList } from './features/TournamentList/TournamentList.component';
import { createTournamentService } from './services/tournaments.service';
import { ActionObject } from './types/tournaments.type';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceValue = useDebounce(searchTerm);
  const dispatch = useDispatch();

  const handleCreateTournament = () => {
    const title = prompt('New tournament name', '') as string;
    if (title.trim()) {
      dispatch(createTournamentService(title) as unknown as ActionObject);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <HeaderContainer>
        <Input onChange={handleOnChange} placeholder="Search tournament ..." />
        <Button onClick={handleCreateTournament}>create tournament</Button>
      </HeaderContainer>
      <TournamentList searchTerm={debounceValue} />
    </Container>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
