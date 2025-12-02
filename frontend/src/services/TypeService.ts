import { http } from "./http";
import type { Type } from "../types/type";

export const TypeService = {
  async getAll(): Promise<Type[]> {
    const { data } = await http.get<Type[]>("/request-type/all");

    return data.map((u) => ({
      id: u.id,
      name: u.name,
    }));
  },

  async create(name: string) {
    const { data } = await http.post<{
      success: boolean;
      message: string;
    }>(`/request-type/create`, { name: name });
    return data;
  },
};
