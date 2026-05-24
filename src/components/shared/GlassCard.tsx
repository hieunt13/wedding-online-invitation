import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`glass-card p-6 rounded-xl w-full text-center ${className}`}
      style={{
        background: "rgba(251, 249, 246, 0.15)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(200, 169, 107, 0.2)",
      }}
    >
      {children}
    </div>
  );
}
