import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.jwt]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
