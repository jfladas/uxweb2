import { AuthConfig } from 'angular-oauth2-oidc';
import { env } from '@env/env';

export const authConfig: AuthConfig = {
  oidc: true,
  issuer: env.auth0Domain,
  redirectUri: window.location.origin,
  logoutUrl: window.location.origin,
  clientId: env.auth0ClientId,
  responseType: 'code',
  scope: 'openid profile email',
  requestAccessToken: true,
  showDebugInformation: !env.production,
  customQueryParams: {
    audience: `${env.auth0Domain}api/v2/`,
  },
};
