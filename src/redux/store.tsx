import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const makeStore = () =>
  configureStore({
    reducer: reducers,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export default makeStore;


