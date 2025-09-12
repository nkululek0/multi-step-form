import type { PersonalInfoState, GlobalState } from "./provider.types";

import { createContext, useContext } from "react";

const personalInfoState: PersonalInfoState = {
  name: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  phoneNumber: {
    value: '',
    error: '',
  },
  isValid: false
};

export const globalState: GlobalState = {
  personalInfo: personalInfoState
};

export const GlobalContext = createContext<GlobalState | undefined>(undefined);
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};