import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    let status;
    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: exception.meta.cause ?? 'Not Found',
        });
        break;
      default: // 500
        super.catch(exception, host);
        break;
    }
  }
}
