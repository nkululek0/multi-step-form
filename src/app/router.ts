import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { SideBarStepIndicator } from '../components/side-bar';
import { PersonalInfo } from '../components/personal-info';
import { SelectPlan } from '../components/select-plan';
import { AddOns } from '../components/add-ons';
import { FinishingUp } from '../components/finishing-up';
import { Summary } from '../components/summary';
import { NotFound } from '../components/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: () => React.createElement(SideBarStepIndicator, {children: React.createElement(PersonalInfo), step: 1 }),
  },
  {
    path: '/select-plan',
    Component: () => React.createElement(SideBarStepIndicator, {children: React.createElement(SelectPlan), step: 2 }),
  },
  {
    path: '/add-ons',
    Component: () => React.createElement(SideBarStepIndicator, {children: React.createElement(AddOns), step: 3 }),
  },
  {
    path: '/finishing-up',
    Component: () => React.createElement(SideBarStepIndicator, {children: React.createElement(FinishingUp), step: 4 }),
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