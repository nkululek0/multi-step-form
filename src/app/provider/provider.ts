import type { PersonalInfoState, PlanAndBillingState, AddOnsState, GlobalState } from "./provider.types";

import { createContext, useContext, createElement, useRef } from "react";

const usePersonalState = () => {
  const personalInfoState: React.RefObject<PersonalInfoState> = useRef({
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
  });

  return personalInfoState;
};

const usePlanAndBillingState = () => {
  const planAndBillingState: React.RefObject<PlanAndBillingState> = useRef({
    plan: { type: 'ARCADE', price: 9 },
    billing: 'MONTHLY',
    isValid: false
  });

  return planAndBillingState;
}

const useAddOnsState = () => {
  const addOnsState: React.RefObject<AddOnsState> = useRef({
    billingType: usePlanAndBillingState().current.billing,
    addOnsList: []
  });

  return addOnsState;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const personalInfoState: PersonalInfoState = usePersonalState().current;
  const planAndBillingState: PlanAndBillingState = usePlanAndBillingState().current;
  const addOnsState: AddOnsState = useAddOnsState().current;
  const globalState = {
    personalInfo: personalInfoState,
    planAndBilling: planAndBillingState,
    addOns: addOnsState
  };

  return createElement(GlobalContext.Provider, { value: globalState }, children);
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};