import Confirmation from '../../assets/images/icon-confirmation.svg';

export function Summary() {
  return (
    <>
      <article className='summary'>
        <img src={ Confirmation } alt='confirmation image' />
        <h1>Thank You</h1>
        <p className="summary">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at 2V6Yb@example.com
        </p>
      </article>
    </>
  );
};