export const errorInitialState = [];

export default (state = errorInitialState, { type, payload, meta }) => {
  const match = /(.*)_(REQUEST|FAIL|ERROR)/.exec(type);

  if (!match) return state;

  const [action, actionType, actionName] = match;

  if (action === 'UPDATE_ERROR') {
    return [
      ...state.slice(0, payload.index),
      ...state.slice(payload.index + 1),
    ];
  }

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
