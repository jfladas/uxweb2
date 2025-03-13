import { Controller, Delete, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {}
    
    @Get()
    @UseGuards(AuthGuard('github'))
    async login() {
        //
    }

    @Get('callback')
    @UseGuards(AuthGuard('github'))
    async callback(@Req() req: Request, @Res() res: Response) {
        const jwt = await this.authService.login(req.user);
        res.cookie('jwt', jwt, { httpOnly: true, sameSite: 'none', secure: true });
        res.redirect(this.configService.get<string>('FRONTEND_REDIRECT'));
    }

    @Delete('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Res() res: Response) {
        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @Get('status')
    @UseGuards(AuthGuard('jwt'))
    status() {
        return { authenticated: true };
    }

}
