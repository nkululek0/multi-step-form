import Styles from './Side-Bar.module.css';

export function SideBar() {
  return (
    <>
      <section className={ Styles['side-bar'] } >
        <div className='side-bar-item'>
          <div className={ Styles['step-indicator-wrapper']}>
            <p>1</p>
          </div>
          <div className={ Styles['step-indicator']}>
            <p>Step 1</p>
            <p>Your Info</p>
          </div>
        </div>
        <div className='side-bar-item'>
          <div className={ Styles['step-indicator-wrapper']}>
            <p>2</p>
          </div>
          <div className={ Styles['step-indicator']}>
            <p>Step 2</p>
            <p>Select Plan</p>
          </div>
        </div>
        <div className='side-bar-item'>
          <div className={ Styles['step-indicator-wrapper']}>
            <p>3</p>
          </div>
          <div className={ Styles['step-indicator']}>
            <p>Step 3</p>
            <p>Add Ons</p>
          </div>
        </div>
        <div className='side-bar-item'>
          <div className={ Styles['step-indicator-wrapper']}>
            <p>4</p>
          </div>
          <div className={ Styles['step-indicator']}>
            <p>Step 4</p>
            <p>Summary</p>
          </div>
        </div>
      </section>
    </>
  );
}