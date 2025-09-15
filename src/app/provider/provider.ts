import type { PersonalInfoState, PlanAndBillingState, AddOnsState, GlobalState } from "./provider.types";

import react from "react";
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

const addOnsState: AddOnsState = {
  billingType: planAndBillingState.billing,
  addOnsList: []
}

const globalState: GlobalState = {
  personalInfo: personalInfoState,
  planAndBilling: planAndBillingState,
  addOns: addOnsState
};

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return react.createElement(GlobalContext.Provider, { value: globalState }, children);
}
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};