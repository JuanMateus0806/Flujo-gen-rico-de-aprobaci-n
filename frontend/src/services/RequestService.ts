import { http } from "./http";
import type { CreateRequestDto, RequestDto } from "../types/request";

export const RequestsService = {
  async getAll(id: string, role: string): Promise<RequestDto[]> {
    const { data } = await http.get<RequestDto[]>(`/request/all/${id}`, {
      params: { role },
    });

    return data;
  },

  async updateStatus(
    id: string,
    payload: { state: string; comment: string },
  ): Promise<RequestDto> {
    const { data } = await http.put<RequestDto>(
      `/request/update/${id}`,
      payload,
    );

    return data;
  },

  async create(payload: CreateRequestDto) {
    const { data } = await http.post<{
      success: boolean;
      message: string;
    }>(`/request/create`, payload);
    return data;
  },
};
