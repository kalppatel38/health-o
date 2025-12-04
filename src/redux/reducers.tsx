import auth from "./slices/auth";

// Root reducers map (mirrors svastha's `reducers.tsx` pattern)
const reducers = {
  auth,
};

export type RootReducerKey = keyof typeof reducers;

export default reducers;


