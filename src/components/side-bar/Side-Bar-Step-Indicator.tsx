import { useEffect } from 'react';

type SideBarStepIndicatorProps = {
  children: React.ReactNode,
  step: number
};

export const SideBarStepIndicator = (props: SideBarStepIndicatorProps) => {
  const { children, step } = props;

  useEffect(() => {
    const sideBarSteps = document.querySelectorAll('.side-bar-item');

    sideBarSteps.forEach((sideBarStep) => {
      sideBarStep.classList.remove('active');
    });

    sideBarSteps[step - 1].classList.add('active');
  }, []);

  return children;
};