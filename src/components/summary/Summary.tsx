import styles from './Summary.module.css';

import Confirmation from '../../assets/images/icon-confirmation.svg';

export function Summary() {
  return (
    <>
      <article className={styles['summary-wrapper']}>
        <section className={styles['summary']}>
          <img src={ Confirmation } alt='confirmation image' />
          <h1>Thank you!</h1>
          <p>
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at nkuluekozikode@gmail.com
          </p>
        </section>
      </article>
    </>
  );
};