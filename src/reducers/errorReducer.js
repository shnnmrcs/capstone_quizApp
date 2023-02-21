export const errorInitialState = [];

export default (state = errorInitialState, { type, payload, meta }) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionType, actionName] = match;

  const title = type
    .split('_')
    .map((x, i) => {
      if (i === 0) {
        return `${x[0].toUpperCase()}${x.slice(1).toLocaleLowerCase()}`;
      }
      return x.toLocaleLowerCase();
    })
    .join(' ');

  if (actionName === 'FAIL') {
    return [
      ...state,
      {
        action: actionType,
        message: payload.message,
        title,
        ...meta,
      },
    ];
  }

  return state.filter(
    x => !(x.action === actionType && x.loadingId === meta.loadingId),
  );
};
