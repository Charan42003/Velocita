import React from "react";
import RouteManager from "./components/router/RouteManager";
import { Provider } from "react-redux"
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <RouteManager />
    </Provider>
  );
}