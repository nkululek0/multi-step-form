// Add-Ons Types
export type AddOnsState = {
    billingType: 'MONTHLY' | 'YEARLY',
    onlineService: boolean,
    largerStorage: boolean,
    customizableProfile: boolean
};

export type AddOnsActionType = 'ADD' | 'REMOVE';
export type AddOnsActionPackage = 'ONLINE_SERVICE' | 'LARGER_STORAGE' | 'CUSTOMIZABLE_PROFILE';
export type AddOnsAction = {
    type: AddOnsActionPackage,
    elementReference: React.RefObject<HTMLInputElement | null>
};

export type AddOnsReducer = (state: AddOnsState, action: AddOnsAction) => AddOnsState;
// END Add-Ons Types

// NextButton Types
export type NextButtonState = {
    uri: '/' | '/summary',
    isValid: boolean
};

export type NextButtonReducer = (state: NextButtonState) => NextButtonState;
// END Next Button Types