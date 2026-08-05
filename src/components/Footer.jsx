import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/all-posts', label: 'Blogs' },
  { to: '/', label: 'About' },
  { to: '/user', label: 'User' },
  { to: '/', label: 'Contact' },
];

const SOCIAL_LINKS = [
  {to: 'https://github.com/RajuNadar', label: 'github'},
  {to: 'https://www.instagram.com/sahil7.dz/?next=%2F', label: 'Instagram'},
];

const LINK_CLASSES = "transition-all duration-300 font-medium bg-linear-to-br from-base-main via-accent to-base-main bg-clip-text text-transparent hover:text-accent hover:scale-110";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="relative w-full rounded-t-2xl py-4 overflow-hidden bg-primary-dark">
      <div className="max-w-full flex flex-col items-center text-center space-y-8">
        <h2 className="text-3xl font-bold text-base-main">
          BLOG-It
        </h2>
        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-semibold uppercase tracking-widest">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label}
              to={link.to} 
              className={LINK_CLASSES}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          {SOCIAL_LINKS.map((item, index) => (
            <React.Fragment key={item}>
              <a 
                href={item.to}
                className={` ${LINK_CLASSES}`}
              >
                {item.label}
              </a>
              {index < 1 && <span className="w-1 h-1 bg-slate-200 rounded-full" />}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full flex flex-col items-center space-y-4">
          <div className="w-12 h-0.5 bg-slate-100 rounded-full" />
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
            © {currentYear} — BLOG-It — Write. Share. Inspire.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
