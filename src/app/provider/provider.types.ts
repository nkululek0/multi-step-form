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

export type UsePersonalInfoContext = () => PersonalInfoState;

export type GlobalState = {
    personalInfo: PersonalInfoState
};