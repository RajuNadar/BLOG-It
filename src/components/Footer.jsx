import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full rounded-t-2xl p-3 border-t border-slate-100 font-sans overflow-hidden bg-primary-dark">
      <div className="max-w-full flex flex-col items-center text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">
          BLOG-It
        </h2>
        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[13px] font-semibold uppercase tracking-widest text-slate-400">
          <Link to='/' className="hover:text-accent hover:scale-110 transition-all duration-300 font-black bg-linear-to-br from-slate-950 via-white to-orange-400 bg-clip-text text-transparent cursor-default">Articles</Link>
          <Link to='/' className="hover:text-accent hover:scale-110 transition-all duration-300 font-black bg-linear-to-br from-slate-950 via-white to-orange-400 bg-clip-text text-transparent cursor-default">About</Link>
          <Link to='/' className="hover:text-accent hover:scale-110 transition-all duration-300 font-black bg-linear-to-br from-slate-950 via-white to-orange-400 bg-clip-text text-transparent cursor-default">Archive</Link>
          <Link to='/' className="hover:text-accent hover:scale-110 transition-all duration-300 font-black bg-linear-to-br from-slate-950 via-white to-orange-400 bg-clip-text text-transparent cursor-default">Contact</Link>
        </nav>
        <div className="flex items-center space-x-6">
          {['Twitter', 'LinkedIn', 'Github'].map((item, index) => (
            <React.Fragment key={item}>
              <Link
                to='/'
                className="text-[10px] hover:text-accent hover:scale-110 transition-all duration-300 font-black bg-linear-to-br from-slate-950 via-white to-orange-400 bg-clip-text text-transparent cursor-default"
              >
                {item}
              </Link>
              {index < 2 && <span className="w-1 h-1 bg-slate-200 rounded-full" />}
            </React.Fragment>
          ))}
        </div>
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="w-12 h-0.5 bg-slate-100 rounded-full" />
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
            © {currentYear} — Designed for the Curious
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
