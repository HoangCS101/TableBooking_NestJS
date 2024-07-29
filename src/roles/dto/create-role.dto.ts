import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly roleName: string;
}