import { ThunkAction } from 'redux-thunk';
import store from '../store';

export interface ActionObject {
  type: string;
  payload?: Record<string, any> | string;
}

export interface RootState {
  tournaments: TournamentsReducer;
}

export interface TournamentsReducer {
  tournamentList: {
    response: TournamentResponse[];
    status: FetchingStatusType;
  };
  foundTournaments: {
    response: TournamentResponse[];
    status: FetchingStatusType;
  };
  editTournament: {
    content: { name: string; id: string };
    status: FetchingStatusType;
  };
}

export type FetchingStatusType =
  typeof FetchingStatus[keyof typeof FetchingStatus];

export const FetchingStatus = {
  LOADING: 'loading',
  EMPTY: 'empty',
  DONE: 'done',
  ERROR: 'error',
} as const;

export type TournamentResponse = {
  id: string;
  game: string;
  name: string;
  organizer: string;
  participants: { current: number; max: number };
  startDate: string;
};

export type ThunkActionObj = ThunkAction<
  void,
  RootState,
  unknown,
  ActionObject
>;

export type AppDispatch = typeof store.dispatch;
