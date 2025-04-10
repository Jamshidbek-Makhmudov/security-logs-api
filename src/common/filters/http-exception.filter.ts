import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const errorResponse = exception.getResponse()

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(typeof errorResponse === 'object' ? errorResponse : { message: errorResponse }),
    }

    this.logger.error(`HTTP Exception: ${status} - ${JSON.stringify(responseBody)}`, exception.stack)

    response.status(status).json(responseBody)
  }
}
