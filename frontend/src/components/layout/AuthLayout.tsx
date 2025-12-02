import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start pt-20 bg-ubuntu-purple overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(94,23,235,0.5),_transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white font-semibold backdrop-blur-sm">
            FA
          </div>

          {title && (
            <h1 className="text-2xl font-semibold text-white drop-shadow-md">
              {title}
            </h1>
          )}

          {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
