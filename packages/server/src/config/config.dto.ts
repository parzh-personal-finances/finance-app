import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsPort, IsPositive, IsString, IsUrl, Min } from 'class-validator'
import { EnvName } from './env-name.js'
import { IsValidEnum } from './is-valid-enum.decorator.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends ConfigDTO {}
  }
}

export const MIN_RATE_LIMITER_TIMEFRAME_MSEC = 1
export const MIN_RATE_LIMITER_MAX_HITS_PER_TIMEFRAME = 1

export const defaults = {
  NODE_ENV: EnvName.production,
  PORT: '3000',
  DB_PORT: 5432,
  RATE_LIMITER_TIMEFRAME_MSEC: 1000,
  RATE_LIMITER_MAX_HITS_PER_TIMEFRAME: 5,
} satisfies Partial<ConfigDTO>

export class ConfigDTO {
  @IsOptional()
  @IsValidEnum(EnvName)
  readonly NODE_ENV: EnvName = defaults.NODE_ENV

  @IsString()
  @IsNotEmpty()
  readonly DB_HOST!: string

  @IsOptional()
  @IsPort()
  readonly DB_PORT: number = defaults.DB_PORT;

  @IsString()
  @IsNotEmpty()
  readonly DB_NAME: string = this.NODE_ENV // yes, "this"; by default, each environment is connected to its own database

  @IsString()
  @IsNotEmpty()
  readonly DB_USER!: string

  @IsString()
  @IsNotEmpty()
  readonly DB_PASS!: string

  @IsPort()
  readonly PORT: string = defaults.PORT

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(MIN_RATE_LIMITER_TIMEFRAME_MSEC)
  readonly RATE_LIMITER_TIMEFRAME_MSEC: number =
    defaults.RATE_LIMITER_TIMEFRAME_MSEC

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(MIN_RATE_LIMITER_MAX_HITS_PER_TIMEFRAME)
  readonly RATE_LIMITER_MAX_HITS_PER_TIMEFRAME: number =
    defaults.RATE_LIMITER_MAX_HITS_PER_TIMEFRAME

  @IsString()
  @IsNotEmpty()
  readonly AUTH0_CLIENT_ID!: string

  @IsString()
  @IsNotEmpty()
  readonly AUTH0_API_ID!: string

  @IsUrl({
    allow_fragments: false,
    allow_query_components: false,
    disallow_auth: true,
    require_protocol: true,
  })
  readonly AUTH0_DOMAIN!: string
}
