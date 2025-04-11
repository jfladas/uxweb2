import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = () => {
  const oauthService = inject(OAuthService);
  const router = inject(Router);
  if (oauthService.hasValidAccessToken()) {
    return true;
  }
  return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
    if (oauthService.hasValidAccessToken()) {
      return true;
    }
    router.navigate(['/login']);
    return false;
  });
};