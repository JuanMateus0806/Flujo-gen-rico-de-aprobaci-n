import { type FormEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { RequestsService } from "../../services/RequestService";
import { UsersService } from "../../services/UsersService";
import { TypeService } from "../../services/TypeService";

import type { CreateRequestDto } from "../../types/request";
import type { User } from "../../types/user";
import type { Type } from "../../types/type";

interface RequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
  catalogsVersion?: number;
}


interface FormState {
  title: string;
  description: string;
  approver: string;
  type: string;
}

const initialFormState: FormState = {
  title: "",
  description: "",
  approver: "",
  type: "",
};

const RequestForm = ({ isOpen, onClose, onCreated, catalogsVersion }: RequestFormProps) => {
  const [form, setForm] = useState<FormState>(initialFormState);

  const [approvers, setApprovers] = useState<User[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingCatalogs, setLoadingCatalogs] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const storedUser = localStorage.getItem("currentUser");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!isOpen) return;

    const loadCatalogs = async () => {
      try {
        setLoadingCatalogs(true);
        const [approversRes, typesRes] = await Promise.all([
          UsersService.getApprovers(),
          TypeService.getAll(),
        ]);

        setApprovers(approversRes);
        setTypes(typesRes);
      } catch (e) {
        console.error(e);
        setError("Error cargando la información inicial");
      } finally {
        setLoadingCatalogs(false);
      }
    };

    loadCatalogs();
  }, [isOpen, catalogsVersion]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const titleRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s.,;:]+$/;
    const descRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s.,;:_-]+$/;

    if (!form.title.trim()) return setError("El título es obligatorio");
    if (!titleRegex.test(form.title))
      return setError("Título: No se permiten caracteres especiales");

    if (!form.description.trim())
      return setError("La descripción es obligatoria");
    if (!descRegex.test(form.description))
      return setError("Descripción: No se permiten caracteres especiales");

    if (!form.approver) return setError("Debes seleccionar un responsable");
    if (!form.type) return setError("Debes seleccionar un tipo");
    if (!user?.id)
      return setError("Error: no se encontró el usuario en sesión");

    try {
      setLoading(true);

      const payload: CreateRequestDto = {
        title: form.title,
        description: form.description,
        applicant: user.id,
        approver: form.approver,
        type: form.type,
      };

      const res = await RequestsService.create(payload);

      if (!res.success) {
        setError(res.message ?? "Error creando la solicitud");
        return;
      }

      onCreated?.();
      setForm(initialFormState);
      onClose();
    } catch (error: unknown) {
      console.error(error);

      let msg = "Error creando la solicitud";

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message?: string | string[] }>;
        const dataMessage = err.response?.data?.message;

        if (Array.isArray(dataMessage)) {
          msg = dataMessage.join(". ");
        } else if (typeof dataMessage === "string") {
          msg = dataMessage;
        }
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
      onClick={() => !loading && onClose()}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white/95 shadow-xl border border-slate-100 p-6 md:p-7 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Nueva solicitud
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Completa la información para enviar tu solicitud al aprobador.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 text-sm transition"
          >
            ✕
          </button>
        </div>

        {loadingCatalogs ? (
          <div className="py-8 text-center text-sm text-slate-500">
            Cargando información...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* Solicitante */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">
                Solicitante
              </label>
              <input
                type="text"
                value={user ? user.full_name : "Usuario no identificado"}
                disabled
                className="w-full rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-xs text-slate-700"
              />
            </div>

            {/* Título */}
            <div className="space-y-1.5">
              <label
                htmlFor="title"
                className="text-xs font-medium text-slate-600"
              >
                Título
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Ej. Solicitud de acceso"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-xs font-medium text-slate-600"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe brevemente lo que necesitas…"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Responsable */}
              <div className="space-y-1.5">
                <label
                  htmlFor="approver"
                  className="text-xs font-medium text-slate-600"
                >
                  Responsable
                </label>
                <select
                  id="approver"
                  name="approver"
                  value={form.approver}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60"
                  style={{
                    minWidth: "100%",
                  }}
                >
                  <option value="">Selecciona un responsable</option>
                  {approvers.map((u) => (
                    <option
                      key={u.id}
                      value={u.id}
                      className="text-sm"
                      style={{ maxWidth: "400px" }}
                    >
                      {u.full_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo */}
              <div className="space-y-1.5">
                <label
                  htmlFor="type"
                  className="text-xs font-medium text-slate-600"
                >
                  Tipo de solicitud
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60"
                >
                  <option value="">Selecciona un tipo</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Guardando..." : "Crear solicitud"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default RequestForm;
