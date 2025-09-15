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

// Add Ons Types
type AddOnType = 'Online service' | 'Larger storage' | 'Customisable profile';

type AddOn = {
    name: AddOnType,
    description: string,
    price: number
};
export type AddOnsState = {
    addOnsList: Array<AddOn>
};
// END Add Ons Types

// Finishing Up Types
export type FinishingUpState = {
    plan: Plan,
    billing: BillingType
    addOnsList: Array<{ name: AddOnType, price: number }>,
};
// END Finishing Up Types

export type GlobalState = {
    personalInfo: PersonalInfoState,
    planAndBilling: PlanAndBillingState,
    addOns: AddOnsState,
    finishingUp: FinishingUpState
};