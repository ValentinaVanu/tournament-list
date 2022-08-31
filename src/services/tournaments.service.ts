import * as action from '../actions/tournaments';
import * as types from '../types/tournaments.type';
import * as API from '../constants/api';

export const getTournamentListService = (): types.ThunkActionObj => {
  return async (dispatch) => {
    dispatch(action.getTournamentList());
    try {
      const data = await (await fetch(API.API_TOURNAMENTS_URL)).json();
      dispatch(action.getTournamentListSuccess(data));
    } catch (error) {
      dispatch(action.getTournamentListFail([error]));
    }
  };
};

export const getTournamentByIdService = (id: string): types.ThunkActionObj => {
  return async (dispatch) => {
    dispatch(action.getTournamentById(id));
    try {
      const data = await (
        await fetch(`${API.API_TOURNAMENTS_URL}/${id}`)
      ).json();
      dispatch(action.getTournamentByIdSuccess(data));
    } catch (error) {
      dispatch(action.getTournamentByIdFail([error]));
    }
  };
};

export const editTournamentService = (payload: {
  id: string;
  name: string;
}): types.ThunkActionObj => {
  return async (dispatch) => {
    dispatch(action.setTournamentEdit(payload));
    try {
      await fetch(`${API.API_TOURNAMENTS_URL}/${payload.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(action.setTournamentEditSuccess());
    } catch (error) {
      dispatch(action.setTournamentEditFail());
      dispatch(getTournamentListService());
    }
  };
};

export const createTournamentService = (name: string): types.ThunkActionObj => {
  return async (dispatch) => {
    dispatch(action.setTournamentCreateNew(name));
    try {
      const data = await fetch(API.API_TOURNAMENTS_URL, {
        method: 'POST',
        body: JSON.stringify({ name: name }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(action.setTournamentCreateNewSuccess(data));
    } catch (error) {}
    dispatch(action.setTournamentCreateNewFail());
    dispatch(getTournamentListService());
  };
};

export const deleteTournamentService = (id: string): types.ThunkActionObj => {
  return async (dispatch) => {
    dispatch(action.setTournamentDelete(id));
    try {
      const data = await fetch(`${API.API_TOURNAMENTS_URL}/${id}`, {
        method: 'DELETE',
      });
      dispatch(action.setTournamentDeleteSuccess(data));
    } catch (error) {
      dispatch(action.setTournamentDeleteFail());
      dispatch(getTournamentListService());
    }
  };
};
