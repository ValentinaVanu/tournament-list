import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActionObject,
  FetchingStatus,
  RootState,
} from '../../types/tournaments.type';
import { Button } from '../../components/Button';
import { TournamentsContainer } from '../../components/Tournament';
import { UpdateMessageContainer } from '../../components/Container';
import * as tournamentServices from '../../services/tournaments.service';
import { getTournamentByIdReset } from '../../actions/tournaments';
import { TournamentCard } from '../TournamentCard/TournamentCard.component';

interface TournamentListProps {
  searchTerm: string;
}

export const TournamentList = ({ searchTerm }: TournamentListProps) => {
  const { tournamentList, foundTournaments } = useSelector(
    (state: RootState) => state.tournaments
  );
  const dispatch = useDispatch();

  const derivedList =
    searchTerm && tournamentList.response.length
      ? foundTournaments
      : tournamentList;

  const isSingleTournment = derivedList.response.length === 1;

  const fetchTournamentList = () =>
    dispatch(
      tournamentServices.getTournamentListService() as unknown as ActionObject
    );

  const fetchSearchTournaments = (searchTerm: string) => {
    const filteredTournaments = tournamentList.response
      .filter((tournament) =>
        tournament.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((tournament) => {
        dispatch(
          tournamentServices.getTournamentByIdService(
            tournament.id
          ) as unknown as ActionObject
        );
        return tournament;
      });
    !filteredTournaments.length && dispatch(getTournamentByIdReset());
  };

  useEffect(() => {
    fetchTournamentList();
    // eslint-disable-next-line
  }, []);

  // Search by ID
  useEffect(() => {
    if (!!searchTerm) fetchSearchTournaments(searchTerm);
    // eslint-disable-next-line
  }, [searchTerm]);

  const handleRetry = () =>
    searchTerm && tournamentList.response.length
      ? fetchSearchTournaments(searchTerm)
      : fetchTournamentList();

  return (
    <>
      <UpdateMessageContainer>
        {derivedList.status === FetchingStatus.LOADING && (
          <p>Loading tournaments ...</p>
        )}
        {derivedList.status === FetchingStatus.ERROR && (
          <>
            <p>Something went wrong</p>
            <Button onClick={handleRetry}>retry</Button>
          </>
        )}
        {derivedList.status === FetchingStatus.EMPTY && (
          <p>There are currently no tournaments</p>
        )}
      </UpdateMessageContainer>
      {derivedList.status === FetchingStatus.DONE && (
        <TournamentsContainer>
          {derivedList.response.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              isSingleTournament={isSingleTournment}
              data={tournament}
            />
          ))}
        </TournamentsContainer>
      )}
    </>
  );
};
