import type { RequestDto } from "../../types/request";

interface ManageRequestModalProps {
  open: boolean;
  request: RequestDto | null;

  status: string;
  comment: string;

  saving: boolean;
  error?: string | null;

  onClose: () => void;
  onChangeStatus: (value: string) => void;
  onChangeComment: (value: string) => void;
  onSave: () => void;
}

const ManageRequestModal = ({
                              open,
                              request,
                              status,
                              comment,
                              saving,
                              error,
                              onClose,
                              onChangeStatus,
                              onChangeComment,
                              onSave,
                            }: ManageRequestModalProps) => {
  if (!open || !request) return null;

  const isFormValid = status.trim() !== "" && comment.trim() !== "";

  return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Gestionar solicitud
          </h2>

          <div className="mb-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700 whitespace-pre-wrap">
            {request.description || "Sin descripción"}
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Estado
            </label>
            <select
                value={status}
                onChange={(e) => onChangeStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              {request.state.toUpperCase() === "PENDIENTE" && (
                  <option value="PENDIENTE">Pendiente</option>
              )}
              <option value="APROBADA">Aprobada</option>
              <option value="RECHAZADA">Rechazada</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Comentario del aprobador
            </label>
            <textarea
                value={comment}
                onChange={(e) => onChangeComment(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
                placeholder="Escribe aquí el comentario para el solicitante…"
            />
          </div>

          {error && <p className="mb-3 text-xs text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 text-sm">
            <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50 transition"
                disabled={saving}
            >
              Cancelar
            </button>

            <button
                type="button"
                onClick={onSave}
                disabled={saving || !isFormValid}
                className="rounded-full bg-violet-500 px-4 py-2 font-medium text-white hover:bg-violet-600 disabled:opacity-60 transition"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ManageRequestModal;
