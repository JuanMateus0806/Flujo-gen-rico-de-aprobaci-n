import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateRequestTypeDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-zÁÉÍÓÚÜáéíóúüñÑ\s.,;:]+$/, {
    message: 'No se permiten caracteres especiales',
  })
  name: string;
}
