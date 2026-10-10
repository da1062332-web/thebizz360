const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowRight = () => (
  <svg {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = () => (
  <svg {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Check = () => (
  <svg {...base} strokeWidth={3}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const Menu = () => (
  <svg {...base} width={22} height={22}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = () => (
  <svg {...base} width={22} height={22}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
