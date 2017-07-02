import { combineReducers } from 'redux';

function reduceReducers(...reducers) {
  return (state, action) =>
  reducers.reduce(
    (s, r) => r(s, action),
    state
    );
}

function create(state) {
  if (typeof state === 'function') {
    return [ state ];
  } else if (typeof state === 'object') {
    return Object.keys(state).reduce((accum, key) => {
      return Object.assign(accum, { [key]: create(state[key]) });
    }, {});
  }
}

function initState(state) {
  return (s = state) => s;
}

function apply(registry) {
  if (Array.isArray(registry)) {
    return reduceReducers(...registry);
  }

  const keys = Object.keys(registry);
  const combined = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    combined[key] = apply(registry[key]);
  }
  return combineReducers(combined);
}

const Registry = {
  reduceReducers,
  initState,
  create,
  apply,
};

export default Registry;
