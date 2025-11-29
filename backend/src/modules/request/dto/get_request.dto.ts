import { IsNotEmpty, IsString } from 'class-validator';

export class GetRequestDto {
  id: string;
  title: string;
  description: string;
  create_at: string;
  update_at: string;
  applicant: string;
  approver: string;
  status: string;
  comment: string;
}

export class GetRequestDtoFront {
  @IsString()
  @IsNotEmpty()
  role: string;
}
