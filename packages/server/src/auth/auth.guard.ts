import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {
  auth,
  InsufficientScopeError,
  InvalidRequestError,
  InvalidTokenError,
  UnauthorizedError,
} from 'express-oauth2-jwt-bearer'
import { Request, Response } from 'express-serve-static-core'
import { ServerError } from '@/app/app-error/app-error.js'
import { ConfigService } from '@/config/config.service.js'

/** @private */
const errorsMap = [
  [InvalidRequestError, BadRequestException],
  [InvalidTokenError, UnauthorizedException],
  [InsufficientScopeError, ForbiddenException],
] as const

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected readonly config: ConfigService) { }

  protected readonly middleware = auth({
    secret: this.config.get(this.config.keys.JWT_SECRET),
    audience: this.config.get(this.config.keys.JWT_AUDIENCE),
    issuerBaseURL: this.config.get(this.config.keys.JWT_ISSUER_BASE_URL),
    tokenSigningAlg: this.config.get(this.config.keys.JWT_ALGORITHM),
  })

  async canActivate(context: ExecutionContext): Promise<true> {
    const http = context.switchToHttp()
    const req = http.getRequest<Request>()
    const res = http.getResponse<Response>()

    const error = await new Promise<UnauthorizedError | null>((resolve, reject) => {
      this.middleware(req, res, (arg: unknown) => {
        if (arg instanceof UnauthorizedError || arg == null) {
          return resolve(arg ?? null)
        }

        return reject(
          new JWTMiddlewareResultUnexpected()
            .addDetail({
              public: false,
              payload: arg,
              message: 'Expected an error or a `null` / `undefined`',
            }),
        )
      })
    })

    if (!error) {
      return true
    }

    const options = { cause: error } as const

    for (const [UnauthorizedErrorKnown, HttpExceptionKnown] of errorsMap) {
      if (error instanceof UnauthorizedErrorKnown) {
        throw new HttpExceptionKnown(error.message, options)
      }
    }

    throw new HttpException(error.message, error.statusCode, options)
  }
}

export class JWTMiddlewareResultUnexpected extends ServerError {
  public override readonly statusCode = '503'

  constructor() {
    super('JWT middleware returned unexpected result')
  }
}
