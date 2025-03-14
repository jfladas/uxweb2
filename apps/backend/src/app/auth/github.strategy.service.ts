import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class GithubStrategyService extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private userService: UserService // Korrekte Dependency Injection
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'], // Fügt zusätzliche Datenabfrage hinzu
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    return await this.userService.findOrCreate(profile); // Leitet an UserService weiter
  }
}
