import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateJwt = (payload) => this.jwtService.sign(payload);

    login = async (user) =>
    this.generateJwt({
      sub: user.id,
      username: user.username,
      displayName: user.displayName,
    });
}
