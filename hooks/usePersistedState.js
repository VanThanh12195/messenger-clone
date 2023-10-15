import { useEffect, useState } from 'react';

const Store = new Map();

export const usePersistedState = (id, initialState) => {
  const stateFromStore = Store.has(id) ? Store.get(id) : undefined;
  const [state, dispatch] = useState(stateFromStore ?? initialState);
  useEffect(() => {
    Store.set(id, state);
  }, [state, id]);
  return [state, dispatch];
};

export const removeFromState = (id) => {
  Store.delete(id);
};
