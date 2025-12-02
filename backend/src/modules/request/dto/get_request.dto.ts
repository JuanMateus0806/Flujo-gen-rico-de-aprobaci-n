export class GetRequestDto {
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
  editable: boolean;
}

export class History {
  id: string;
  state: string;
  created_at: string;
  comment: string;
  performed_by: string;
}
