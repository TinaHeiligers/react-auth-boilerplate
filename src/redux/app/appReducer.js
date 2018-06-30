import { Map } from 'immutable';
import appActions from './appActions';

const initState = new Map({
  loading: true,
  error: null,
});
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case appActions.APP_LOADING:
      return state.set('loading', action.loading);
    default:
      return state;
  }
  return state;
}
export default appReducer;
