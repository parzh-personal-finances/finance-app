import { IsUUID } from "class-validator";

export class GetEntityByIdParams {
  @IsUUID('4')
  readonly entityId!: string
}
