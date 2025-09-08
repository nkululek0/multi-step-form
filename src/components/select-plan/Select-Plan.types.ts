type PlanType = 'ARCADE' | 'ADVANCED' | 'PRO';
type BillingType = 'MONTHLY' | 'YEARLY';
type Plan = { type: PlanType, price: number };

export type PlanAndBillingState = {
    plan: Plan,
    billing: BillingType
};

type ActionPlan = {
  type: 'SET_PLAN',
  payload: Plan
};

type ActionBilling = {
  type: 'SET_BILLING',
  payload: BillingType
};

export type PlanAndBillingAction = ActionPlan | ActionBilling;

export type PlanAndBillingReducer = (state: PlanAndBillingState, action: PlanAndBillingAction) => PlanAndBillingState;