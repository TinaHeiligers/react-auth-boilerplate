const counterActions = {
  INCREMENT_REQUESTED: 'INCREMENT_REQUESTED',
  INCREMENT: 'INCREMENT',
  increment: () => ({ type: counterActions.INCREMENT }),
  requestIncrement: () => ({ type: counterActions.INCREMENT_REQUESTED }),
}

export default counterActions;