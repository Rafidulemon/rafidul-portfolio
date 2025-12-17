const floatingSymbols = [
  { label: "</>", top: "12%", left: "9%", delay: "0s" },
  { label: "{ }", top: "24%", left: "72%", delay: "1.4s" },
  { label: "01", top: "58%", left: "14%", delay: "2.3s" },
  { label: "AI", top: "36%", left: "46%", delay: "0.8s" },
  { label: "const", top: "70%", left: "68%", delay: "3s" },
  { label: "async", top: "48%", left: "82%", delay: "1.8s" },
  { label: "TS", top: "18%", left: "55%", delay: "2.8s" },
];

const pulseNodes = [
  { top: "18%", left: "32%", size: "h-2 w-2", delay: "0s" },
  { top: "42%", left: "20%", size: "h-3 w-3", delay: "1.6s" },
  { top: "64%", left: "40%", size: "h-2 w-2", delay: "3.2s" },
  { top: "30%", left: "78%", size: "h-2 w-2", delay: "2.2s" },
  { top: "62%", left: "84%", size: "h-3 w-3", delay: "0.9s" },
  { top: "80%", left: "28%", size: "h-2 w-2", delay: "4s" },
];

const TechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* animated grid */}
      <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_center,_rgba(0,0,0,0.8),_transparent_70%)] dark:opacity-60">
        <div className="tech-grid absolute -inset-[45%] bg-[linear-gradient(90deg,_rgba(14,165,233,0.08)_1px,_transparent_1px),linear-gradient(0deg,_rgba(14,165,233,0.08)_1px,_transparent_1px)] dark:bg-[linear-gradient(90deg,_rgba(59,130,246,0.18)_1px,_transparent_1px),linear-gradient(0deg,_rgba(59,130,246,0.18)_1px,_transparent_1px)]" />
        <div className="tech-grid-alt absolute -inset-[55%] rotate-45 bg-[linear-gradient(90deg,_rgba(79,70,229,0.08)_1px,_transparent_1px),linear-gradient(0deg,_rgba(79,70,229,0.08)_1px,_transparent_1px)] dark:bg-[linear-gradient(90deg,_rgba(56,189,248,0.16)_1px,_transparent_1px),linear-gradient(0deg,_rgba(56,189,248,0.16)_1px,_transparent_1px)]" />
      </div>

      {/* floating code snippets */}
      <div className="absolute inset-0">
        {floatingSymbols.map((symbol) => (
          <span
            key={`${symbol.label}-${symbol.top}-${symbol.left}`}
            className="tech-float absolute text-[0.65rem] uppercase tracking-[0.35em] text-slate-700/60 dark:text-cyan-100/40"
            style={{ top: symbol.top, left: symbol.left, animationDelay: symbol.delay }}
          >
            {symbol.label}
          </span>
        ))}

        {pulseNodes.map((node, idx) => (
          <span
            key={`node-${idx}`}
            className={`tech-pulse absolute rounded-full bg-cyan-500/70 dark:bg-cyan-300/60 ${node.size}`}
            style={{ top: node.top, left: node.left, animationDelay: node.delay }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechBackground;
