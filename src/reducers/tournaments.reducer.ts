import * as C from '../constants/actions';
import * as types from '../types/tournaments.type';

const initialState: types.TournamentsReducer = {
  tournamentList: {
    response: [],
    status: types.FetchingStatus.DONE,
  },
  foundTournaments: {
    response: [],
    status: types.FetchingStatus.DONE,
  },
  editTournament: {
    content: { name: '', id: '' },
    status: types.FetchingStatus.DONE,
  },
};

const filterEmptyResponse = (
  state: types.TournamentResponse[],
  newEntry: any
) => {
  return [...state, newEntry].filter((entry) => entry);
};

const editTournamentName = (
  state: types.TournamentResponse[],
  payload: Record<string, any>
) => {
  return state.map((tournament) => {
    if (tournament.id === payload?.id)
      return {
        ...tournament,
        name: payload.name,
      };
    return tournament;
  });
};

const filterTournamentById = (
  state: types.TournamentResponse[],
  id: string
) => {
  return state.filter((tournament) => tournament.id !== id);
};

export const tournamentReducer = (
  state: types.TournamentsReducer = initialState,
  action: types.ActionObject
) => {
  switch (action.type) {
    case C.GET_TOURNAMENT_LIST:
      return {
        ...state,
        tournamentList: {
          response: initialState.tournamentList.response,
          status: types.FetchingStatus.LOADING,
        },
      };
    case C.GET_TOURNAMENT_LIST_SUCCESS:
      return {
        ...state,
        tournamentList: {
          response: action.payload,
          status:
            action.payload?.length > 0
              ? types.FetchingStatus.DONE
              : types.FetchingStatus.EMPTY,
        },
      };
    case C.GET_TOURNAMENT_LIST_FAIL:
      return {
        ...state,
        tournamentList: {
          response: initialState.tournamentList.response,
          status: types.FetchingStatus.ERROR,
        },
      };
    case C.GET_TOURNAMENT_BY_ID:
      return {
        ...state,
        foundTournaments: {
          response: initialState.foundTournaments.response,
          status: types.FetchingStatus.LOADING,
        },
      };
    case C.GET_TOURNAMENT_BY_ID_SUCCESS:
      return {
        ...state,
        foundTournaments: {
          response: filterEmptyResponse(
            state.foundTournaments.response,
            action.payload
          ),
          status:
            filterEmptyResponse(state.foundTournaments.response, action.payload)
              .length > 0
              ? types.FetchingStatus.DONE
              : types.FetchingStatus.EMPTY,
        },
      };
    case C.GET_TOURNAMENT_BY_ID_FAIL:
      return {
        ...state,
        foundTournaments: {
          response: initialState.foundTournaments.response,
          status: types.FetchingStatus.ERROR,
        },
      };
    case C.GET_TOURNAMENT_BY_ID_RESET:
      return {
        ...state,
        foundTournaments: {
          response: initialState.foundTournaments.response,
          status: types.FetchingStatus.EMPTY,
        },
      };
    case C.SET_TOURNAMENT_EDIT:
      return {
        ...state,
        tournamentList: {
          ...state.tournamentList,
          response: editTournamentName(
            state.tournamentList.response,
            action.payload as Record<string, any>
          ),
        },
        editTournament: {
          content: action.payload,
          status: types.FetchingStatus.LOADING,
        },
        foundTournaments: {
          ...state.foundTournaments,
          response: editTournamentName(
            state.foundTournaments.response,
            action.payload as Record<string, any>
          ),
        },
      };
    case C.SET_TOURNAMENT_EDIT_SUCCESS:
      return {
        ...state,
        editTournament: initialState.editTournament,
      };
    case C.SET_TOURNAMENT_EDIT_FAIL:
      return {
        ...state,
        editTournament: {
          content: state.editTournament.content,
          status: types.FetchingStatus.ERROR,
        },
      };
    case C.SET_TOURNAMENT_CREATE_NEW:
      return {
        ...state,
        tournamentList: {
          status: types.FetchingStatus.LOADING,
          response: [...state.tournamentList.response, action.payload],
        },
      };
    case C.SET_TOURNAMENT_CREATE_NEW_SUCCESS:
      return {
        ...state,
        tournamentList: {
          ...state.tournamentList,
          status: types.FetchingStatus.DONE,
        },
      };
    case C.SET_TOURNAMENT_CREATE_NEW_FAIL:
      return {
        ...state,
        tournamentList: {
          ...state.tournamentList,
          status: types.FetchingStatus.ERROR,
        },
      };
    case C.SET_TOURNAMENT_DELETE:
      return {
        ...state,
        tournamentList: {
          status: state.tournamentList.response.length
            ? types.FetchingStatus.DONE
            : types.FetchingStatus.EMPTY,
          response: filterTournamentById(
            state.tournamentList.response,
            action.payload as string
          ),
        },
        foundTournaments: {
          status: state.foundTournaments.response.length
            ? types.FetchingStatus.DONE
            : types.FetchingStatus.EMPTY,
          response: filterTournamentById(
            state.foundTournaments.response,
            action.payload as string
          ),
        },
      };
    case C.SET_TOURNAMENT_DELETE_SUCCESS:
      return {
        ...state,
        tournamentList: {
          ...state.tournamentList,
          status: state.tournamentList.response.length
            ? types.FetchingStatus.DONE
            : types.FetchingStatus.EMPTY,
        },
        foundTournaments: {
          status: state.foundTournaments.response.length
            ? types.FetchingStatus.DONE
            : types.FetchingStatus.EMPTY,
          response: filterTournamentById(
            state.foundTournaments.response,
            action.payload as string
          ),
        },
      };
    case C.SET_TOURNAMENT_DELETE_FAIL:
      return {
        ...state,
        tournamentList: {
          ...state.tournamentList,
          status: types.FetchingStatus.ERROR,
        },
      };
    default:
      return state;
  }
};

export default tournamentReducer;
