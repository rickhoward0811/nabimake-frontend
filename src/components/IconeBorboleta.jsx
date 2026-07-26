export default function IconeBorboleta({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nabimake-borboleta-grad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E79DC1" />
          <stop offset="100%" stopColor="#5E4028" />
        </linearGradient>
      </defs>

      {/* asa superior esquerda */}
      <path
        d="M23 22C20 12 10 8 6 12c-3.5 3.5-2 12 6 15 2 .8 4 1 6 0"
        fill="url(#nabimake-borboleta-grad)"
      />
      {/* asa superior direita */}
      <path
        d="M25 22c3-10 13-14 17-10 3.5 3.5 2 12-6 15-2 .8-4 1-6 0"
        fill="url(#nabimake-borboleta-grad)"
      />
      {/* asa inferior esquerda */}
      <path
        d="M23 26c-2 8-10 11-14 8-2.5-2-2-8 3-10.5 2-1 5.5-1.2 7.5.5"
        fill="url(#nabimake-borboleta-grad)"
        opacity="0.85"
      />
      {/* asa inferior direita */}
      <path
        d="M25 26c2 8 10 11 14 8 2.5-2 2-8-3-10.5-2-1-5.5-1.2-7.5.5"
        fill="url(#nabimake-borboleta-grad)"
        opacity="0.85"
      />
      {/* corpo */}
      <line x1="24" y1="14" x2="24" y2="34" stroke="#3D2A1A" strokeWidth="2.4" strokeLinecap="round" />
      {/* antenas */}
      <path d="M24 15c-1.5-2-3-3-4.5-2.5" stroke="#3D2A1A" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M24 15c1.5-2 3-3 4.5-2.5" stroke="#3D2A1A" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
