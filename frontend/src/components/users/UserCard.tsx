import type { User } from "../../types/user";

interface UserCardProps {
  user: User;
  selected?: boolean;
  onClick?: () => void;
}

const roleLabel: Record<User["role"], string> = {
  ADMINISTRADOR: "Administrador",
  SOLICITANTE: "Solicitante",
  APROBADOR: "Aprobador",
};

const UserCard = ({ user, selected = false, onClick }: UserCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-4 text-left transition-all",
        "bg-white/5 hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 hover:shadow-xl",
        selected && "border-white bg-white/20",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ubuntu-purple-light to-fuchsia-500 text-base font-semibold text-white shadow-md">
        {user.full_name.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">
            {user.full_name}
          </span>
          <span className="text-xs text-slate-200/80">{user.role}</span>
        </div>

        <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-100">
          {roleLabel[user.role]}
        </span>
      </div>
    </button>
  );
};

export default UserCard;
