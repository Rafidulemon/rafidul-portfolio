import { useId } from "react";

const SIZES = { xs: 16, sm: 20, md: 32, lg: 48, xl: 72 } as const;

type SpinnerProps = {
  size?: keyof typeof SIZES;
  /** Accessible text; also shown under the spinner when `showLabel` is set. */
  label?: string;
  showLabel?: boolean;
  /** Draw with the surrounding text colour (for use inside buttons) instead of the brand gradient. */
  mono?: boolean;
  className?: string;
};

/**
 * Brand loading spinner: a gradient arc that spins around a faint track, with a slower
 * counter-rotating inner arc and a softly pulsing core. Pure SVG + CSS, no JS animation.
 */
export default function Spinner({ size = "md", label = "Loading", showLabel = false, mono = false, className = "" }: SpinnerProps) {
  const gid = useId().replace(/:/g, "");
  const px = SIZES[size];
  const stroke = px <= 20 ? 5 : 4;
  const stroke1 = mono ? "currentColor" : `url(#g1-${gid})`;
  const stroke2 = mono ? "currentColor" : `url(#g2-${gid})`;

  return (
    <span role="status" className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 50 50"
        aria-hidden
        className="overflow-visible"
        fill="none"
      >
        {!mono && (
          <defs>
            <linearGradient id={`g1-${gid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id={`g2-${gid}`} x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        )}
        {/* track */}
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeOpacity={mono ? 0.25 : 0.12} strokeWidth={stroke} />
        {/* outer arc */}
        <g className="origin-center animate-spin motion-reduce:animate-none" style={{ transformOrigin: "25px 25px", animationDuration: "0.9s" }}>
          <circle cx="25" cy="25" r="20" stroke={stroke1} strokeWidth={stroke} strokeLinecap="round" strokeDasharray="42 126" />
        </g>
        {/* inner arc, opposite direction (hidden at tiny sizes where it just adds noise) */}
        {px > 20 && (
          <g
            className="origin-center animate-spin motion-reduce:animate-none"
            style={{ transformOrigin: "25px 25px", animationDuration: "1.6s", animationDirection: "reverse" }}
          >
            <circle cx="25" cy="25" r="12" stroke={stroke2} strokeWidth={stroke - 1} strokeLinecap="round" strokeDasharray="22 54" opacity={0.85} />
          </g>
        )}
        {/* pulsing core */}
        {px > 20 && <circle cx="25" cy="25" r="3.2" fill={mono ? "currentColor" : "#22d3ee"} className="animate-pulse motion-reduce:animate-none" />}
      </svg>
      {showLabel ? <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span> : <span className="sr-only">{label}</span>}
    </span>
  );
}

/** Centred spinner for page / section loading states. */
export function PageLoader({ label = "Loading…", fullScreen = false, className = "" }: { label?: string; fullScreen?: boolean; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? "min-h-screen" : "min-h-[40vh]"} ${className}`}>
      <Spinner size="lg" label={label} showLabel />
    </div>
  );
}
