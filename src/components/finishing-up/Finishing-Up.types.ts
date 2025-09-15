import type { PersonalInfoState } from "../personal-info/Personal-Info.types";

type PlanType = 'ARCADE' | 'ADVANCED' | 'PRO';
type BillingType = 'MONTHLY' | 'YEARLY';

type Plan = { type: PlanType, price: number };

type AddOnType = 'Online service' | 'Larger storage' | 'Customisable profile';

export type FinishingUpState = {
    plan: Plan,
    billing: BillingType
    addOnsList: Array<{ name: AddOnType, price: number }>,
};

export type NextButtonState = {
    uri: '/' | '/summary',
    isValid: boolean,
    personalInfo: PersonalInfoState
};

export type NextButtonReducer = (state: NextButtonState) => NextButtonState;