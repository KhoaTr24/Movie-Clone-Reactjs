import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './authContext/AuthContext';
import { HistoryContextProvider } from './context/historiesContext/HistoryContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HistoryContextProvider>
    <App />
      </HistoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

