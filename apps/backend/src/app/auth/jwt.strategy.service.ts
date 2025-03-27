import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get('OIDC_DOMAIN')}.well-known/jwks.json`,
        handleSigningKeyError: (error) => console.log('signing key error', error)
      }),
      audience: `${configService.get('OIDC_DOMAIN')}api/v2/`,
      issuer: configService.get('OIDC_DOMAIN'),
      algorithms: ['RS256'],
    });
  }
}