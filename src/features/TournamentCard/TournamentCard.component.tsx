import React from 'react';
import { useDispatch } from 'react-redux';
import H6 from '../../components/H6';
import { Button, ButtonContainer } from '../../components/Button';
import { StyledTournamentCard } from '../../components/Tournament';
import { handleDateFormat } from '../../utils/utils';
import { ActionObject, TournamentResponse } from '../../types/tournaments.type';
import {
  deleteTournamentService,
  editTournamentService,
} from '../../services/tournaments.service';

interface TournamentCardProps {
  data: TournamentResponse;
  isSingleTournament: boolean;
}

export const TournamentCard = ({
  isSingleTournament,
  data,
}: TournamentCardProps) => {
  const dispatch = useDispatch();

  const handleEditTournament = (id: string) => {
    const newTitle = prompt('New tournament name', '') as string;
    const payload = { id: id, name: newTitle };
    if (newTitle.trim()) {
      dispatch(editTournamentService(payload) as unknown as ActionObject);
    }
  };

  const handleDeleteTournament = (id: string) => {
    if (
      window.confirm('Do you really want to delete this tournament ?') === true
    ) {
      dispatch(deleteTournamentService(id) as unknown as ActionObject);
    }
  };

  return (
    <StyledTournamentCard isSingle={isSingleTournament}>
      <H6>{data?.name}</H6>
      <p>Organizer: {data?.organizer}</p>
      <p>Game: {data?.game}</p>
      <p>
        Participants: {data?.participants.current}/{data?.participants.max}
      </p>
      <p>
        Start: {handleDateFormat(data?.startDate)?.day},{' '}
        {handleDateFormat(data?.startDate)?.time}
      </p>
      <ButtonContainer>
        <Button onClick={() => handleEditTournament(data?.id)}>edit</Button>
        <Button onClick={() => handleDeleteTournament(data?.id)}>delete</Button>
      </ButtonContainer>
    </StyledTournamentCard>
  );
};
