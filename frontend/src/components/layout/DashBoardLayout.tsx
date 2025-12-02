import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";

interface DashboardLayoutProps {
  children: ReactNode;
  onCreateRequest?: () => void;
  onCreateType?: () => void;
  currentUser?: User | null;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const DashBoardLayout = ({
  children,
  onCreateRequest,
  onCreateType,
  currentUser,
}: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const displayName = currentUser?.full_name ?? "Usuario";

  const storedRole = localStorage.getItem("roleUser");
  const rawRole = (storedRole || currentUser?.role || "").toString().trim();
  const displayRole = rawRole || "";
  const role = rawRole.toUpperCase();

  const isSolicitant = role === "SOLICITANTE";
  const isAdmin = role === "ADMINISTRADOR" || role === "ADMIN";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="flex w-72 flex-col border-r border-slate-200 bg-white">
          {/* Header*/}
          <div className="flex flex-col items-center px-5 py-6 border-b border-slate-200 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500 text-sm font-semibold text-white">
              {getInitials(displayName)}
            </div>

            <span className="text-sm font-semibold text-slate-900 leading-tight">
              {displayName}
            </span>

            {displayRole && (
              <span className="mt-2 inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                {displayRole}
              </span>
            )}
          </div>

          {/* Menú */}
          <nav className="flex-1 space-y-3 px-4 py-4">
            {isSolicitant && onCreateRequest && (
              <button
                type="button"
                onClick={onCreateRequest}
                className="flex w-full items-center gap-2 rounded-xl bg-violet-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-600 transition"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-600/70 text-xs">
                  +
                </span>
                Crear solicitud
              </button>
            )}

            {isAdmin && (
              <div className="space-y-2">
                {onCreateRequest && (
                  <button
                    type="button"
                    onClick={onCreateRequest}
                    className="flex w-full items-center gap-2 rounded-xl bg-violet-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-600 transition"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-600/70 text-xs">
                      +
                    </span>
                    Crear solicitud
                  </button>
                )}

                {onCreateType && (
                  <button
                    type="button"
                    onClick={onCreateType}
                    className="flex w-full items-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm font-medium text-violet-600 shadow-sm hover:bg-violet-50 transition"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100 text-xs text-violet-600">
                      +
                    </span>
                    Crear tipo de solicitud
                  </button>
                )}
              </div>
            )}

            <div className="pt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Menú
            </div>

            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-sm text-violet-700"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
              Solicitudes
            </button>
          </nav>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-xs">
            <div className="flex flex-col">
              <span className="text-slate-500">Sesión activa</span>
              <span className="text-[11px] text-slate-400">{displayName}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
