import type { PersonalInfoState, PlanAndBillingState, GlobalState } from "./provider.types";

import { createContext, useContext } from "react";

const personalInfoState: PersonalInfoState = {
  name: {
    value: 'Nkululeko',
    error: '',
  },
  email: {
    value: 'nkululekovuyo000gmail.com',
    error: '',
  },
  phoneNumber: {
    value: '0812726384',
    error: '',
  },
  isValid: false
};

const planAndBillingState: PlanAndBillingState = {
  plan: { type: 'ARCADE', price: 9 },
  billing: 'MONTHLY',
  isValid: false
};

export const globalState: GlobalState = {
  personalInfo: personalInfoState,
  planAndBilling: planAndBillingState
};

export const GlobalContext = createContext<GlobalState | undefined>(undefined);
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};