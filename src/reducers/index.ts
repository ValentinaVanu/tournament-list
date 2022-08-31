import { combineReducers } from 'redux';
import tournaments from './tournaments.reducer';

const rootReducer = combineReducers({
  tournaments,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
