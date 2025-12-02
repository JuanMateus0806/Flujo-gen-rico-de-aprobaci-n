import type { RequestDto } from "../../types/request";

interface RequestHistoryModalProps {
  open: boolean;
  request: RequestDto | null;
  onClose: () => void;
}

interface HistoryItem {
  state: string;
  created_at: string;
  comment?: string | null;
  performed_by?: string | null;
}

const getStateClasses = (state: string) => {
  const s = state.toUpperCase();
  if (s === "APROBADA") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  if (s === "RECHAZADA") {
    return "bg-red-50 text-red-700 border-red-200";
  }
  if (s === "PENDIENTE") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  return "bg-slate-50 text-slate-700 border-slate-200";
};

const RequestHistoryModal = ({
  open,
  request,
  onClose,
}: RequestHistoryModalProps) => {
  if (!open || !request) return null;

  const history: HistoryItem[] = (request.history as HistoryItem[]) ?? [];

  const hasHistory = history && history.length > 0;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Historial de la solicitud
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Trazabilidad de estados y comentarios para:
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {request.title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        {!hasHistory ? (
          <div className="rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            Esta solicitud aún no tiene historial registrado.
          </div>
        ) : (
          <div className="relative mt-2">
            {/* línea vertical de la “timeline” */}
            <div className="absolute left-4 top-0 h-full w-px bg-slate-200" />

            <ul className="space-y-4 pl-0">
              {history.map((item, index) => {
                const isFirst = index === 0;

                return (
                  <li
                    key={`${item.created_at}-${index}`}
                    className="relative flex gap-4"
                  >
                    {/* Punto de la timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`mt-1 h-3 w-3 rounded-full border-2 bg-white ${
                          isFirst ? "border-violet-500" : "border-slate-300"
                        }`}
                      />
                    </div>

                    {/* Card de evento */}
                    <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs text-slate-700">
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={
                            "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold " +
                            getStateClasses(item.state)
                          }
                        >
                          {item.state}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {item.created_at}
                        </span>
                      </div>

                      {item.comment ? (
                        <p className="mt-1 whitespace-pre-wrap text-[11px] text-slate-700">
                          {item.comment}
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] italic text-slate-400">
                          Sin comentario
                        </p>
                      )}

                      <div className="mt-2 text-[11px] text-slate-500">
                        <span className="font-medium text-slate-600">
                          Realizado por:{" "}
                        </span>
                        {item.performed_by && item.performed_by.trim() !== ""
                          ? item.performed_by
                          : "Sistema"}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestHistoryModal;
