import counterActions from './counterActions';

const initialState = 0;

const counter = (currentState = initialState, action) => {
  switch (action.type) {
    case counterActions.INCREMENT:
    return currentState + 1;
    default:
    return currentState;
  }
}
export default counter;