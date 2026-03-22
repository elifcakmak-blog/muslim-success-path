// Static Luma logo as a pure SVG — two overlapping ovals sharing a corner node.
// Coordinates mapped exactly from the Three.js geometry constants.
// Use this for any static/non-animated context instead of the Three.js canvas.

interface Props {
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function LumaLogoSVG({ size = 80, className, style }: Props) {
  const h = Math.round(size * 103 / 95)
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 95 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <radialGradient id="ll-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE040" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Vertical oval */}
      <ellipse cx="31.4" cy="44.3" rx="23.4" ry="36.3"
        stroke="#F5C842" strokeWidth="1.8" />

      {/* Horizontal oval */}
      <ellipse cx="54.8" cy="74.0" rx="31.7" ry="19.8"
        stroke="#F5C842" strokeWidth="1.8" />

      {/* Corner node glow halo */}
      <circle cx="31.4" cy="74.0" r="9" fill="url(#ll-node-glow)" />

      {/* Corner node */}
      <circle cx="31.4" cy="74.0" r="3.2" fill="#FFE040" />
    </svg>
  )
}
