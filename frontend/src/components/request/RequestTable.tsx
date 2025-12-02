import { Fragment, useEffect, useState } from "react";
import type { RequestDto } from "../../types/request";
import { RequestsService } from "../../services/RequestService";
import ManageRequestModal from "./ManageRequestModal.tsx";
import RequestHistoryModal from "./RequestHistoryModal.tsx";

interface RequestTableProps {
  requests: RequestDto[];
  isApprover?: boolean;
  onRequestUpdated?: (req: RequestDto) => void;
}

const PAGE_SIZE = 5;

const RequestTable = ({
  requests,
  isApprover = false,
  onRequestUpdated,
}: RequestTableProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");

  const [editing, setEditing] = useState<RequestDto | null>(null);
  const [editStatus, setEditStatus] = useState<string>("PENDIENTE");
  const [editComment, setEditComment] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyRequest, setHistoryRequest] = useState<RequestDto | null>(null);

  const [page, setPage] = useState(1);

  const normalized = search.toLowerCase();

  const filtered = requests.filter((r) => {
    const matchesSearch =
      !normalized ||
      r.title.toLowerCase().includes(normalized) ||
      r.description.toLowerCase().includes(normalized) ||
      r.applicant.toLowerCase().includes(normalized) ||
      r.approver.toLowerCase().includes(normalized) ||
      r.state.toLowerCase().includes(normalized) ||
      r.type.toLowerCase().includes(normalized);

    const matchesStatus =
      statusFilter === "TODOS" || r.state.toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginated = filtered.slice(startIndex, endIndex);

  const statuses = Array.from(
    new Set(requests.map((r) => r.state.toUpperCase())),
  );

  const openEdit = (req: RequestDto) => {
    setEditing(req);
    setEditStatus(req.state);
    setEditComment(req.comment ?? "");
    setSaveError(null);
  };

  const closeEdit = () => {
    setEditing(null);
    setSaveError(null);
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      setSaving(true);

      const updated = await RequestsService.updateStatus(editing.id, {
        state: editStatus,
        comment: editComment,
      });

      onRequestUpdated?.(updated);
      closeEdit();
    } catch (err) {
      console.error(err);
      setSaveError("No se pudo actualizar la solicitud");
    } finally {
      setSaving(false);
    }
  };

  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setPage((prev) => Math.min(totalPages, prev + 1));


  const handleViewHistory = (req: RequestDto) => {
    setHistoryRequest(req);
    setHistoryOpen(true);
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        {/* Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Buscar por título, tipo, solicitante, aprobador…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Estado:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <option value="TODOS">Todos</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla + paginación */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 w-[40%]">Título</th>
                <th className="px-4 py-3 w-[12%]">Tipo</th>
                <th className="px-4 py-3 w-[13%]">Solicitante</th>
                <th className="px-4 py-3 w-[13%]">Aprobador</th>
                <th className="px-4 py-3 w-[8%]">Estado</th>
                <th className="px-4 py-3 w-[7%]">Creada</th>
                <th className="px-4 py-3 w-[7%]">Actualizada</th>
                <th className="px-4 py-3 w-[10%] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {totalItems === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No hay solicitudes que coincidan con los filtros.
                  </td>
                </tr>
              )}

              {paginated.map((req, idx) => {
                return (
                  <tr
                    key={req.id}
                    className={
                      idx % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50 hover:bg-slate-100 transition"
                    }
                  >
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-col gap-1 max-w-xl">
                        <span className="font-medium text-slate-900">
                          {req.title}
                        </span>
                        {req.description && (
                          <span className="text-xs text-slate-600 whitespace-pre-wrap">
                            {req.description}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Tipo */}
                    <td className="px-4 py-3 align-top text-xs">
                      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700">
                        {req.type}
                      </span>
                    </td>

                    {/* Solicitante */}
                    <td className="px-4 py-3 align-top text-sm text-slate-700">
                      {req.applicant}
                    </td>

                    {/* Aprobador */}
                    <td className="px-4 py-3 align-top text-sm text-slate-700">
                      {req.approver}
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-3 align-top">
                      <span
                        className={[
                          "inline-flex rounded-full px-3 py-1 text-xs font-semibold border",
                          req.state.toUpperCase() === "APROBADA" &&
                            "bg-emerald-50 text-emerald-700 border-emerald-200",
                          req.state.toUpperCase() === "RECHAZADA" &&
                            "bg-red-50 text-red-700 border-red-200",
                          req.state.toUpperCase() === "PENDIENTE" &&
                            "bg-amber-50 text-amber-700 border-amber-200",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {req.state}
                      </span>
                    </td>

                    {/* Fechas */}
                    <td className="px-4 py-3 align-top text-xs text-slate-600">
                      {req.create_at}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-slate-600">
                      {req.update_at}
                    </td>

                    <td className="px-4 py-3 align-top text-right text-xs">
                      <div className="flex flex-col items-end gap-1">
                        {/* Ver historial */}
                        <button
                          type="button"
                          onClick={() => handleViewHistory(req)}
                          className="inline-flex justify-center items-center whitespace-nowrap min-w-[120px] rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition"
                        >
                          Ver historial
                        </button>

                        {/* Gestión */}
                        {isApprover &&
                          (req.editable ? (
                            <button
                              type="button"
                              onClick={() => openEdit(req)}
                              className="inline-flex justify-center items-center whitespace-nowrap min-w-[120px] rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-medium text-violet-700 hover:bg-violet-100 transition"
                            >
                              Gestionar
                            </button>
                          ) : (
                            <span className="inline-flex justify-center items-center whitespace-nowrap min-w-[120px] rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-400 italic">
                              Finalizada
                            </span>
                          ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Controles de paginación */}
          {totalItems > 0 && (
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <div>
                Mostrando{" "}
                <span className="font-semibold">
                  {totalItems === 0 ? 0 : startIndex + 1}-
                  {Math.min(endIndex, totalItems)}
                </span>{" "}
                de <span className="font-semibold">{totalItems}</span>{" "}
                solicitudes
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-[11px] text-slate-500">
                  Página <span className="font-semibold">{page}</span> de{" "}
                  <span className="font-semibold">{totalPages}</span>
                </span>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ManageRequestModal
          open={!!editing}
          request={editing}
          status={editStatus}
          comment={editComment}
          saving={saving}
          error={saveError}
          onClose={closeEdit}
          onChangeStatus={setEditStatus}
          onChangeComment={setEditComment}
          onSave={handleSave}
      />

      <RequestHistoryModal
          open={historyOpen}
          request={historyRequest}
          onClose={() => setHistoryOpen(false)}
      />

    </Fragment>
  );
};

export default RequestTable;
