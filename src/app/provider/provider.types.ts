// Personal Info Types
type Details = {
    value: string;
    error: string;
}

export type PersonalInfoState = {
    name: Details;
    email: Details;
    phoneNumber: Details;
    isValid: boolean;
};
// END Personal Info Types

// Select Plan Types
type PlanType = 'ARCADE' | 'ADVANCED' | 'PRO';
type BillingType = 'MONTHLY' | 'YEARLY';
type Plan = { type: PlanType, price: number };

export type PlanAndBillingState = {
    plan: Plan,
    billing: BillingType,
    isValid: boolean
};
// END Select Plan Types

export type GlobalState = {
    personalInfo: PersonalInfoState,
    planAndBilling: PlanAndBillingState
};