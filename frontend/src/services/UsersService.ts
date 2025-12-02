import { http } from "./http";
import type { User } from "../types/user";

export const UsersService = {
  async getAll(): Promise<User[]> {
    const { data } = await http.get<User[]>("/person/all");

    return data.map((u) => ({
      id: u.id,
      full_name: u.full_name,
      role: u.role,
    }));
  },

  async getApprovers(): Promise<User[]> {
    const { data } = await http.get<User[]>("/person/approvers");

    return data.map((u) => ({
      id: u.id,
      full_name: u.full_name,
      role: u.role,
    }));
  },
};
