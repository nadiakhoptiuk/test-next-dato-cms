import PropTypes from 'prop-types';
import Link from 'next/link';

export const ButtonLink = ({ children, href, button, className, ...props }) => {
  return button ? (
    <button
      type="button"
      className={`flex items-center justify-center rounded-lg bg-blueAccent py-4 px-8 text-lg font-medium  transition duration-300 ease-in-out hover:bg-yellow-200 hover:text-slate-600 focus:bg-yellow-200 focus:text-slate-600 md:px-5  ${className}`}
      {...props}
    >
      {children}
    </button>
  ) : (
    <Link
      href={href}
      className={`flex items-center justify-center rounded-lg bg-blueAccent px-14 py-4 text-lg font-medium text-slate-50 transition duration-300 ease-in-out hover:bg-yellow-200 hover:text-slate-600 focus:bg-yellow-200 focus:text-slate-600  ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  button: PropTypes.bool,
  className: PropTypes.string,
};
