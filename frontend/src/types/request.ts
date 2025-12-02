export interface RequestDto {
  id: string;
  title: string;
  description: string;
  create_at: string;
  update_at: string;
  applicant: string;
  approver: string;
  type: string;
  state: string;
  history: History[];
  comment?: string;
  editable: boolean;
}

export interface History {
  id: string;
  state: string;
  created_at: string;
  comment?: string;
  performed_by: string;
}

export interface CreateRequestDto {
  title: string;
  description: string;
  applicant: string;
  approver: string;
  type: string;
}
