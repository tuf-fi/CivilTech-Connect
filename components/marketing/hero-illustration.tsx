export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 440 440"
      className="h-full w-full"
      role="img"
      aria-label="Certificate of completion card over a car silhouette"
    >
      {/* faint scan-grid texture */}
      <defs>
        <pattern id="hero-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-background/10" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="440" height="440" fill="url(#hero-grid)" />

      {/* car silhouette watermark */}
      <g className="text-background/10" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M40 300 L70 260 Q90 235 130 235 L280 235 Q315 235 335 260 L365 300 L365 320 L40 320 Z" />
        <circle cx="105" cy="320" r="26" />
        <circle cx="305" cy="320" r="26" />
        <line x1="150" y1="235" x2="140" y2="270" />
        <line x1="250" y1="235" x2="260" y2="270" />
      </g>

      {/* offset back card */}
      <rect
        x="118"
        y="76"
        width="230"
        height="290"
        rx="6"
        transform="rotate(6 233 221)"
        className="fill-primary/25"
      />

      {/* main certificate card */}
      <g transform="rotate(-4 220 220)">
        <rect x="95" y="70" width="230" height="290" rx="6" className="fill-background" />
        <rect x="95" y="70" width="230" height="10" rx="4" className="fill-primary" />

        {/* checkmark badge */}
        <circle cx="210" cy="140" r="34" className="fill-primary/10" />
        <circle cx="210" cy="140" r="34" fill="none" className="stroke-primary" strokeWidth="2.5" />
        <path
          d="M195 140 L206 151 L227 128"
          fill="none"
          className="stroke-primary"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="210"
          y="196"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ font: "700 8px var(--font-sans)", letterSpacing: "0.15em" }}
        >
          CERTIFICATE OF COMPLETION
        </text>
        <text
          x="210"
          y="216"
          textAnchor="middle"
          className="fill-foreground"
          style={{ font: "700 15px var(--font-display)", textTransform: "uppercase" }}
        >
          Hybrid Drive Systems
        </text>
        <text
          x="210"
          y="231"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ font: "500 9px var(--font-sans)" }}
        >
          Level 1 · Issued to J. Alvarez
        </text>

        {/* module progress rows */}
        {[
          { y: 260, w: 210, label: "High-Voltage Safety" },
          { y: 285, w: 170, label: "Power Split Devices" },
          { y: 310, w: 130, label: "Regenerative Braking" },
        ].map((row) => (
          <g key={row.label}>
            <text
              x="120"
              y={row.y - 6}
              className="fill-muted-foreground"
              style={{ font: "600 7px var(--font-sans)" }}
            >
              {row.label}
            </text>
            <rect x="120" y={row.y} width="200" height="6" rx="3" className="fill-secondary" />
            <rect x="120" y={row.y} width={row.w} height="6" rx="3" className="fill-primary" />
          </g>
        ))}
      </g>

      {/* floating stat chip */}
      <g transform="translate(300 60)">
        <rect width="100" height="40" rx="4" className="fill-primary" />
        <text x="50" y="17" textAnchor="middle" className="fill-primary-foreground" style={{ font: "700 12px var(--font-display)" }}>
          94% PASS
        </text>
        <text x="50" y="31" textAnchor="middle" className="fill-primary-foreground/80" style={{ font: "600 7px var(--font-sans)", letterSpacing: "0.1em" }}>
          NETWORK AVERAGE
        </text>
      </g>

      {/* floating tool badge */}
      <g transform="translate(48 340)">
        <circle cx="24" cy="24" r="24" className="fill-background" />
        <circle cx="24" cy="24" r="24" fill="none" className="stroke-border" strokeWidth="1.5" />
        <path
          d="M17 31 L25 23 M25 23 A5 5 0 1 0 20 18 A5 5 0 0 0 25 23"
          fill="none"
          className="stroke-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
