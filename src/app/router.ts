import { createBrowserRouter } from 'react-router-dom';

import { PersonalInfo } from '../components/personal-info';
import { SelectPlan } from '../components/select-plan';
import { AddOns } from '../components/add-ons';
import { FinishingUp } from '../components/finishing-up';
import { Summary } from '../components/summary';
import { NotFound } from '../components/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PersonalInfo
  },
  {
    path: '/select-plan',
    Component: SelectPlan
  },
  {
    path: '/add-ons',
    Component: AddOns
  },
  {
    path: '/finishing-up',
    Component: FinishingUp
  },
  {
    path: '/summary',
    Component: Summary
  },
  {
    path: '*',
    Component: NotFound
  }
]);