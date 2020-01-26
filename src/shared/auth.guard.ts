import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ) {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        request.user = await this.validateRequest(request.headers.authorization);
        return true;
    }
    async validateRequest(token: string) {
        if (token.split(' ')[0] !== 'token') {
            throw new HttpException('Invalid Token', 403);
        }
        const extractedToken = token.split(' ')[1];
        try {
            const decoded = await jwt.verify(extractedToken, process.env.SECRET);
            return decoded;
        } catch (err) {
            const message = 'Token Error ' + extractedToken + err.message;
            throw new HttpException(message, 403);
        }
    }
}
