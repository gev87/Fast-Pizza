import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type }) {
  const base =
    'inline-block cursor-pointer rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed ';
  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 text-xs md:px-5 md:py-2.5',
    secondary:
      'border-2 px-4 py-2.5 md:px-6 md:py-3.5 border-stone-300 inline-block cursor-pointer rounded-full bg-transparent font-semibold tracking-wide text-stone-400 uppercase transition-colors duration-300 hover:text-stone-800 hover:bg-stone-300 focus:bg-stone-300 focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed ',
  };

  if (to) {
    return (
      <Link disabled={disabled} to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
