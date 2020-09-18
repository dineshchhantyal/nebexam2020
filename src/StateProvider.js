  
import React, { createContext, useReducer, useContext } from "react";

//Prepare Datalayer

export const StateContext = createContext();

// Wrap our app and provide the Data layer

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull informarion from the data layer
export const useStateValue = () => useContext(StateContext);