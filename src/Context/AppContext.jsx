import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
  };

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "SET_LOADING": {
        return { ...state, isLoading: action.payload };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
