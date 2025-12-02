import { useEffect, useState, type FormEvent } from "react";
import DashBoardLayout from "../../components/layout/DashBoardLayout";
import RequestTable from "../../components/request/RequestTable";
import RequestForm from "../../components/request/RequestForm";
import { RequestsService } from "../../services/RequestService";
import { TypeService } from "../../services/TypeService";
import type { RequestDto } from "../../types/request";
import type { User } from "../../types/user";

const DashboardPage = () => {
  const [catalogsVersion, setCatalogsVersion] = useState(0);
  const [requests, setRequests] = useState<RequestDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [typeLoading, setTypeLoading] = useState(false);
  const [typeError, setTypeError] = useState<string | null>(null);

  const isApprover = currentUser?.role?.toUpperCase() === "APROBADOR";

  const loadRequests = async () => {
    try {
      setLoading(true);

      const stored = localStorage.getItem("currentUser");
      if (!stored) {
        setError("No hay usuario en sesión");
        return;
      }

      const user: User = JSON.parse(stored);
      setCurrentUser(user);

      const role = localStorage.getItem("roleUser") ?? user.role;
      const data = await RequestsService.getAll(user.id, role.toUpperCase());

      setRequests(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleCreateRequestClick = () => {
    setIsRequestModalOpen(true);
  };

  const handleCreateTypeClick = () => {
    setTypeName("");
    setTypeError(null);
    setIsTypeModalOpen(true);
  };

  const handleRequestCreated = () => {
    setIsRequestModalOpen(false);
    loadRequests();
  };

  const handleRequestUpdated = (updated: RequestDto) => {
    loadRequests();
    setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleSubmitType = async (e: FormEvent) => {
    e.preventDefault();
    setTypeError(null);

    if (!typeName.trim()) {
      setTypeError("El nombre del tipo es obligatorio");
      return;
    }

    try {
      setTypeLoading(true);

      await TypeService.create(typeName.trim());

      setIsTypeModalOpen(false);
      setTypeName("");

      setCatalogsVersion((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setTypeError("No se pudo crear el tipo de solicitud");
    } finally {
      setTypeLoading(false);
    }
  };


  return (
    <DashBoardLayout
      onCreateRequest={handleCreateRequestClick}
      onCreateType={handleCreateTypeClick}
      currentUser={currentUser}
    >
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-slate-900">Solicitudes</h1>
        <p className="text-sm text-slate-600">
          Revisa, filtra y gestiona las solicitudes del sistema.
        </p>
      </header>

      {loading && (
        <p className="text-sm text-slate-600">Cargando solicitudes...</p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <RequestTable
          requests={requests}
          isApprover={isApprover}
          onRequestUpdated={handleRequestUpdated}
        />
      )}

      <RequestForm
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          onCreated={handleRequestCreated}
          catalogsVersion={catalogsVersion}
      />


      {isTypeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={() => !typeLoading && setIsTypeModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white/95 shadow-xl border border-slate-100 p-6 md:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Nuevo tipo de solicitud
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Define un nombre para el nuevo tipo que estará disponible en
                  el sistema.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTypeModalOpen(false)}
                disabled={typeLoading}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 text-sm transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitType} className="space-y-4">
              {typeError && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {typeError}
                </div>
              )}

              <div className="space-y-1.5">
                <label
                  htmlFor="typeName"
                  className="text-xs font-medium text-slate-600"
                >
                  Nombre del tipo
                </label>
                <input
                  id="typeName"
                  type="text"
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                  placeholder="Ej. Cambio de turno, Acceso a sistema..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/60"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTypeModalOpen(false)}
                  disabled={typeLoading}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={typeLoading}
                  className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-violet-700 disabled:opacity-60"
                >
                  {typeLoading ? "Guardando..." : "Crear tipo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashBoardLayout>
  );
};

export default DashboardPage;
