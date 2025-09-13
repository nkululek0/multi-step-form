// Select Plan Types
type PlanType = 'ARCADE' | 'ADVANCED' | 'PRO';
type BillingType = 'MONTHLY' | 'YEARLY';
type Plan = { type: PlanType, price: number };
type PlanWithImage = Plan & { image: string };
export type Plans = Record<PlanType, PlanWithImage>;

export type PlanAndBillingState = {
    plan: Plan,
    billing: BillingType,
    isValid: boolean
};

type ActionPlanAndBillingPlan = {
  type: 'SET_PLAN',
  payload: PlanType
};

type ActionPlanAndBillingBilling = {
  type: 'SET_BILLING',
  elementReference: React.RefObject<HTMLInputElement | null>
};

export type PlanAndBillingAction = ActionPlanAndBillingPlan | ActionPlanAndBillingBilling;

export type PlanAndBillingReducer = (state: PlanAndBillingState, action: PlanAndBillingAction) => PlanAndBillingState;
// END Select Plan Types

// Next Button Types
export type NextButtonState = {
  uri: '/add-ons' | '/'
  isValid: boolean
};

export type NextButtonReducer = (state: NextButtonState) => NextButtonState;
// END Next Button Types