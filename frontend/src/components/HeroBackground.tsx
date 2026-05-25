import React from 'react';

const HeroBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">
    <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#f8fafc', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="mtnGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#d1fae5', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#a7f3d0', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="1000" height="600" fill="url(#skyGrad)" />
      <circle cx="850" cy="100" r="35" fill="#fbbf24" fillOpacity="0.3" />
      <circle cx="10%" cy="20%" r="100" fill="#fee2e2" fillOpacity="0.4" />
      <circle cx="90%" cy="80%" r="150" fill="#f0fdf4" fillOpacity="0.5" />
      <path d="M-100,600 L150,250 L400,600 Z" fill="url(#mtnGrad1)" fillOpacity="0.4" />
      <path d="M200,600 L500,180 L800,600 Z" fill="url(#mtnGrad1)" fillOpacity="0.6" />
      <rect x="0" y="500" width="1000" height="100" fill="white" fillOpacity="0.6" />
    </svg>
  </div>
);

export default HeroBackground;
