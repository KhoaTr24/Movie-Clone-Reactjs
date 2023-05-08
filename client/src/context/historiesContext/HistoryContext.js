import HistoryReducer from "./HistoryReducer";
import { createContext, useReducer } from "react";
import { useEffect } from "react";

const INITIAL_STATE = {
  histories:JSON.parse(localStorage.getItem("histories")) || null,
  isFetching: false,
  error: false,
};

export const HistoryContext = createContext(INITIAL_STATE);

export const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HistoryReducer, INITIAL_STATE);
  
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(state.histories));
  }, [state.histories]);


  return (
    <HistoryContext.Provider
      value={{
        histories: state.histories,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};