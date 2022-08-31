import * as C from '../constants/actions';
import { ActionObject, TournamentResponse } from '../types/tournaments.type';

// Get tournament list
export const getTournamentList = (): ActionObject => ({
  type: C.GET_TOURNAMENT_LIST,
});
export const getTournamentListSuccess = (
  data: TournamentResponse[]
): ActionObject => ({
  type: C.GET_TOURNAMENT_LIST_SUCCESS,
  payload: data,
});
export const getTournamentListFail = (error: any[]): ActionObject => ({
  type: C.GET_TOURNAMENT_LIST_FAIL,
  payload: error,
});

// Get tournameny by ID
export const getTournamentById = (id: string): ActionObject => ({
  type: C.GET_TOURNAMENT_BY_ID,
  payload: id,
});
export const getTournamentByIdSuccess = (
  data: TournamentResponse[]
): ActionObject => ({
  type: C.GET_TOURNAMENT_BY_ID_SUCCESS,
  payload: data,
});
export const getTournamentByIdFail = (error: any[]): ActionObject => ({
  type: C.GET_TOURNAMENT_BY_ID_FAIL,
  payload: error,
});
export const getTournamentByIdReset = (): ActionObject => ({
  type: C.GET_TOURNAMENT_BY_ID_RESET,
});

// Set tournament edit
export const setTournamentEdit = (data: {
  id: string;
  name: string;
}): ActionObject => ({
  type: C.SET_TOURNAMENT_EDIT,
  payload: data,
});
export const setTournamentEditSuccess = () => ({
  type: C.SET_TOURNAMENT_EDIT_SUCCESS,
});
export const setTournamentEditFail = () => ({
  type: C.SET_TOURNAMENT_EDIT_FAIL,
});

// Set tournament create new
export const setTournamentCreateNew = (id: string) => ({
  type: C.SET_TOURNAMENT_CREATE_NEW,
  payload: id,
});
export const setTournamentCreateNewSuccess = (
  data: Response
): ActionObject => ({
  type: C.SET_TOURNAMENT_CREATE_NEW_SUCCESS,
  payload: data,
});
export const setTournamentCreateNewFail = () => ({
  type: C.SET_TOURNAMENT_CREATE_NEW_FAIL,
});

// Set tournament delete
export const setTournamentDelete = (id: string) => ({
  type: C.SET_TOURNAMENT_DELETE,
  payload: id,
});
export const setTournamentDeleteSuccess = (data: Response): ActionObject => ({
  type: C.SET_TOURNAMENT_DELETE_SUCCESS,
  payload: data,
});
export const setTournamentDeleteFail = () => ({
  type: C.SET_TOURNAMENT_DELETE_FAIL,
});
