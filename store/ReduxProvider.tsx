'use client';

import type { ReactNode } from "react";
import { Provider } from "react-redux";

import { makeStore, type AppStore } from "./store";

interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  let store: AppStore;

  // For now, create a new store per usage. If you later need
  // to preserve state across navigations, this can be turned
  // into a memoized store (e.g. via useRef).
  store = makeStore();

  return <Provider store={store}>{children}</Provider>;
}


