import { useEffect, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import UserCard from "../../components/users/UserCard";
import { UsersService } from "../../services/UsersService.ts";
import type { User } from "../../types/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const result = await UsersService.getAll();
        setUsers(result);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const navigate = useNavigate();

  const handleLogin = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/dashboard");
  };

  const handleSelectUser = (user: User) => {
    setSelectedUserId(user.id);
    handleLogin(user);
  };

  return (
    <AuthLayout
      title="Selecciona tu usuario"
      subtitle="Ingresa al flujo de aprobaciones eligiendo tu perfil"
    >
      {loading && (
        <p className="text-sm text-slate-200/80">Cargando usuarios...</p>
      )}

      {error && <p className="text-sm text-red-300">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-4 w-full">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              selected={selectedUserId === user.id}
              onClick={() => handleSelectUser(user)}
            />
          ))}
        </div>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
