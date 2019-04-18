import * as React from 'react'

export const Favicon: React.SFC<{ styles?: React.CSSProperties }> = ({
  styles
}) => (
  <svg
    viewBox="0 0 47 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={styles}
  >
    <path
      d="M27.753 1h15.4186c1.7818 0 2.6741 2.15428 1.4142 3.41421L25.8988 23.1012l18.6175 19.2711c1.2265 1.2695.3268 3.3896-1.4384 3.3896H30.1898c-.5508 0-1.0773-.2272-1.4552-.628L16.6667 32.3333 4.41421 44.5858C3.15428 45.8457 1 44.9534 1 43.1716V3c0-1.10457.89543-2 2-2h11.6667c1.1045 0 2 .89543 2 2v8.2579l9.6721-9.67211C26.7139 1.21071 27.2226 1 27.753 1z"
      fill="url(#logo-gradient)"
    />
    <path
      d="M1 26.9246V3c0-1.10457.89543-2 2-2h11.6667c1.1045 0 2 .89543 2 2v8.2579M1 26.9246v16.247c0 1.7818 2.15428 2.6741 3.41421 1.4142L16.6667 32.3333M1 26.9246l15.6667-15.6667m0 0l9.6721-9.67211C26.7139 1.21071 27.2226 1 27.753 1h15.4186c1.7818 0 2.6741 2.15428 1.4142 3.41421L25.8988 23.1012m-9.2321 9.2321l12.0679 12.8006c.3779.4008.9044.628 1.4552.628h12.8881c1.7652 0 2.6649-2.1201 1.4384-3.3896L25.8988 23.1012m-9.2321 9.2321l9.2321-9.2321"
      stroke="#F8F9FA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="logo-gradient"
        x1="1"
        y1="48"
        x2="48"
        y2="1"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3D22E2" />
        <stop offset="1" stopColor="#229DE2" />
      </linearGradient>
    </defs>
  </svg>
)
