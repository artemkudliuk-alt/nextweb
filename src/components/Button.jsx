import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ text, to, href, variant = 'light', target, rel, onClick, className = '' }) {
  const innerContent = (
    <>
      <div className="btn-inner" data-variant={variant}>
        <div className="btn-text-wrap">
          <span className="btn-text-visible">{text}</span>
          <span className="btn-text-hidden" aria-hidden="true">{text}</span>
        </div>
      </div>
      <div className="btn-arrow" data-variant={variant}>
        <div className="btn-arrow-clip">
          <svg className="btn-icon" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z" fill="currentColor"></path>
          </svg>
          <svg className="btn-icon btn-arrow-incoming" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </>
  );

  const combinedClassName = `btn-premium btn-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClassName} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClassName} target={target} rel={rel} onClick={onClick}>
        {innerContent}
      </a>
    );
  }

  return (
    <button type="button" className={combinedClassName} onClick={onClick}>
      {innerContent}
    </button>
  );
}
