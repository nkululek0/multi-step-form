import type { PersonalInfoState } from "../personal-info/Personal-Info.types";

// Add-Ons Types
type AddOn = {
    name: string,
    description: string,
    price: number
};

export type AddOnType = 'ONLINE_SERVICE' | 'LARGER_STORAGE' | 'CUSTOMISABLE_PROFILE';

export type AddOnTypes = Record<AddOnType, AddOn>;
export type PlanCheckBoxes = {
    [key: string]: React.RefObject<HTMLInputElement | null>;
}

export type AddOnsState = {
    addOnsList: Array<AddOn>
};

export type AddOnsAction = {
    planType: AddOnType,
    elementReference: React.RefObject<HTMLInputElement | null>
};

export type AddOnsReducer = (state: AddOnsState, action: AddOnsAction) => AddOnsState;
// END Add-Ons Types

// NextButton Types
export type NextButtonState = {
    uri: '/finishing-up' | '/',
    isValid: boolean,
    personalInfo: PersonalInfoState
};

export type NextButtonReducer = (state: NextButtonState) => NextButtonState;
// END Next Button Types