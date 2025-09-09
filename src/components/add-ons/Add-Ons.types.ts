type OnlineService = {
    name: 'Online service',
    amount: 1
};

type LargerStorage = {
    name: 'Larger storage',
    amount: 2
};

type CustomisableProfile = {
    name: 'Customisable profile',
    amount: 2
};

export type AddOnsState = {
    billingType: 'MONTHLY' | 'YEARLY',
    packages: Set<AddOnsPackage>,
    totalBill: number
};

export type AddOnsActionType = 'ADD' | 'REMOVE';
export type AddOnsActionPackage = 'Online service' | 'Larger storage' | 'Customisable profile';
export type AddOnsAction = {
    type: AddOnsActionType,
    package: AddOnsActionPackage
};

export type AddOnsPackage = OnlineService | LargerStorage | CustomisableProfile;

export type AddOnsReducer = (state: AddOnsState, action: AddOnsAction) => AddOnsState;