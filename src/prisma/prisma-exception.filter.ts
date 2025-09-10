import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT; // 409 Conflict
        // Usamos 'optional chaining' (?.) para acessar 'meta' e 'target' de forma segura
        const field = (exception.meta?.target as string[])?.[0] || 'campo'; 
        
        response.status(status).json({
          statusCode: status,
          message: `O valor fornecido para o ${field} já está em uso.`,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND; // 404 Not Found
        response.status(status).json({
          statusCode: status,
          message: `O registro que você tentou operar não foi encontrado.`,
        });
        break;
      }
      default:
        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(status).json({
          statusCode: status,
          message: 'Ocorreu um erro inesperado no servidor.',
        });
        break;
    }
  }
}