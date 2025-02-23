import { Type } from "class-transformer";
import { IsInt, IsPositive, Max, Min } from "class-validator";

export const MIN_LIMIT = 0
export const MAX_LIMIT = 1000

export const defaults = {
  limit: 100,
}

export class GetLatestTransfersQuery {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(MIN_LIMIT)
  @Max(MAX_LIMIT)
  readonly limit: number = defaults.limit
}
