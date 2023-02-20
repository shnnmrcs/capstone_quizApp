export const loadingInitialState = [];

export default (state = loadingInitialState, { type, meta }) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionType, actionName] = match;
  
  if (actionName === 'REQUEST') {
    return [
      ...state,
      {
        action: actionType,
        ...meta
      },
    ];
  }
  return state.filter(
    x => !(x.action === actionType && x.loadingId === meta.loadingId),
  );
};
