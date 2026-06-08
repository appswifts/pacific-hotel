import { useId } from "react";
import { cn } from "../utils/cn";

export function FlowerPattern({ opacity = 0.08, size = 80, color = "#8B1A1A", className }) {
  const id = useId();
  const r = size / 2;
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <svg width="100%" height="100%" className="w-full h-full">
        <defs>
          <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
            <rect width={size} height={size} fill="none" />
            <circle cx={size / 2} cy="0" r={r} fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="0" cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx={size} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx={size / 2} cy={size} r={r} fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx={size / 2} cy={size / 2} r={r * 0.15} fill={color} />
            <line x1={size / 2 - r * 0.6} y1={size / 2} x2={size / 2 + r * 0.6} y2={size / 2} stroke={color} strokeWidth="0.8" />
            <line x1={size / 2} y1={size / 2 - r * 0.6} x2={size / 2} y2={size / 2 + r * 0.6} stroke={color} strokeWidth="0.8" />
            <line x1={size / 2 - r * 0.4} y1={size / 2 - r * 0.4} x2={size / 2 + r * 0.4} y2={size / 2 + r * 0.4} stroke={color} strokeWidth="0.5" />
            <line x1={size / 2 + r * 0.4} y1={size / 2 - r * 0.4} x2={size / 2 - r * 0.4} y2={size / 2 + r * 0.4} stroke={color} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} style={{ opacity }} />
      </svg>
    </div>
  );
}

export function DiamondPattern({ opacity = 0.06, size = 100, color = "#8B1A1A", className }) {
  const id = useId();
  const half = size / 2;
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <svg width="100%" height="100%" className="w-full h-full">
        <defs>
          <pattern id={id} width={size} height={size * 0.866} patternUnits="userSpaceOnUse">
            <rect width={size} height={size * 0.866} fill="none" />
            <polygon points={`${half},0 ${size},${half * 0.866} ${half},${size * 0.866} 0,${half * 0.866}`} fill="none" stroke={color} strokeWidth="1" />
            <polygon points={`${half},${size * 0.866} ${size},0 0,0`} fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2,4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} style={{ opacity }} />
      </svg>
    </div>
  );
}

export function CornerAccentPattern({ opacity = 0.1, color = "#8B1A1A", className }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <svg width="100%" height="100%" className="w-full h-full">
        <path d="M0,0 L60,0 L60,4 L4,4 L4,60 L0,60 Z" fill="none" stroke={color} strokeWidth="1" style={{ opacity }} />
        <path d="M100%,0 calc(100%-60px),0 calc(100%-60px),4 calc(100%-4px),4 calc(100%-4px),60px 100%,60px Z" fill="none" stroke={color} strokeWidth="1" style={{ opacity }} />
        <path d="M0,100% L60,100% L60,calc(100%-4px) L4,calc(100%-4px) L4,calc(100%-60px) L0,calc(100%-60px) Z" fill="none" stroke={color} strokeWidth="1" style={{ opacity }} />
        <path d="M100%,100% calc(100%-60px),100% calc(100%-60px),calc(100%-4px) calc(100%-4px),calc(100%-4px) calc(100%-4px),calc(100%-60px) 100%,calc(100%-60px) Z" fill="none" stroke={color} strokeWidth="1" style={{ opacity }} />
      </svg>
    </div>
  );
}
