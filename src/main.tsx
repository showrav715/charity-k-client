// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './global-polyfill';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />
);
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
