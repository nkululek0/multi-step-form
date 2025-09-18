import styles from './Button.module.css';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type ButtonProps = {
  children: string;
  validationSettings: {
    validate: () => void
    uri: string,
    isValid: boolean
  }
};

export function Button(props: ButtonProps) {

  const navigate = useNavigate();
  const { validationSettings, children } = props;

  useEffect(() => {
    if (validationSettings.isValid) {
      navigate(validationSettings.uri);
    }
  }, [validationSettings.isValid]);

  return (
    <button onClick={ () => { validationSettings.validate(); } } className={styles['button']}>{ children }</button>
  );
};