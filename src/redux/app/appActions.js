const appActions = {
  APP_LOADING: 'APP_LOADING',
  toggleGlobalLoader: (loading) => ({
    type: appActions.APP_LOADING,
    loading
  }),
};

export default appActions;
