'use client';

interface TankFluidProps {
  fillPercent: number;
  color: string;
}

export function TankFluid({ fillPercent, color }: TankFluidProps) {
  const clampedFill = Math.max(0, Math.min(100, fillPercent));

  if (clampedFill <= 0) return null;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden rounded-b-lg"
      style={{
        height: `${clampedFill}%`,
        transition: 'height 0.3s ease-out',
      }}
    >
      {/* Fluid body */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${color}dd, ${color}88)`,
        }}
      />

      {/* Wave SVG on top */}
      <svg
        className="absolute top-0 left-0 w-[200%] animate-wave"
        style={{ height: '12px', transform: 'translateY(-6px)' }}
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
      >
        <path
          d={`M0,6 C25,0 25,12 50,6 C75,0 75,12 100,6 C125,0 125,12 150,6 C175,0 175,12 200,6 L200,12 L0,12 Z`}
          fill={`${color}aa`}
        />
        <path
          d={`M0,8 C25,2 25,12 50,8 C75,2 75,12 100,8 C125,2 125,12 150,8 C175,2 175,12 200,8 L200,12 L0,12 Z`}
          fill={`${color}66`}
        />
      </svg>

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${color}22 50%, transparent 70%)`,
        }}
      />
    </div>
  );
}
