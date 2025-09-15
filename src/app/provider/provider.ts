import type { PersonalInfoState, PlanAndBillingState, AddOnsState, FinishingUpState, GlobalState } from "./provider.types";

import { createContext, useContext, createElement, useRef } from "react";

const usePersonalState = () => {
  const personalInfoState: React.RefObject<PersonalInfoState> = useRef({
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
};

const useAddOnsState = () => {
  const addOnsState: React.RefObject<AddOnsState> = useRef({
    addOnsList: []
  });

  return addOnsState;
};

const useFinishingUpSate = () => {
  const planAndBilling = usePlanAndBillingState().current;
  const addOns = useAddOnsState().current;
  const finishingUpState: React.RefObject<FinishingUpState> = useRef({
    plan: planAndBilling.plan,
    billing: planAndBilling.billing,
    addOnsList: addOns.addOnsList
  });

  return finishingUpState;
};

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const personalInfoState: PersonalInfoState = usePersonalState().current;
  const planAndBillingState: PlanAndBillingState = usePlanAndBillingState().current;
  const addOnsState: AddOnsState = useAddOnsState().current;
  const finishingUpState: FinishingUpState = useFinishingUpSate().current;
  const globalState = {
    personalInfo: personalInfoState,
    planAndBilling: planAndBillingState,
    addOns: addOnsState,
    finishingUp: finishingUpState
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