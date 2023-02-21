export const errorInitialState = [];

export default (state = errorInitialState, { type, payload, meta }) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionType, actionName] = match;
  if (actionName === 'FAIL') {
    return [
      ...state,
      {
        action: actionType,
        ...payload,
        ...meta,
      },
    ];
  }

  return state.filter(
    x => !(x.action === actionType && x.loadingId === meta.loadingId),
  );
};
