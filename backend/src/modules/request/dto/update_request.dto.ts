import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Request_status } from '../enum/request_status.enum';

export class UpdateRequestDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
  @IsEnum(Request_status, {
    message: 'El estado que indicaste no es valido',
  })
  state: Request_status;
}
