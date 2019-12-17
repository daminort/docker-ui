import { IsString } from 'class-validator';

export class LogsSubscribeDto {
  @IsString()
  readonly containerID: string;
}
