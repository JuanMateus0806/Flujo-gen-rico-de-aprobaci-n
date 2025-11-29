import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s.,;:]+$/, {
    message: 'No se permiten caracteres especiales',
  })
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  applicant: string;
  @IsString()
  @IsNotEmpty()
  approver: string;
}
