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

type ActionWithPayload = {
  type: 'SET_NAME' | 'SET_EMAIL' | 'SET_PHONE_NUMBER',
  payload: string
};

type ActionWithoutPayload = {
  type: 'VALIDATE'
};

export type PersonalInfoAction = ActionWithPayload | ActionWithoutPayload;

export type PersonalInfoReducer = (state: PersonalInfoState, action: PersonalInfoAction) => PersonalInfoState;