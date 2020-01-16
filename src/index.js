import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./component/App";

import { createStore } from "redux";
import { provider, Provider } from "react-redux";
import reducers from "./reducers";

const store = createStore(
    reducers, //todos los reducers
    {} //estado inicial
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
