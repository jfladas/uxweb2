import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private OauthService = inject(OAuthService);
  login = () => this.OauthService.loadDiscoveryDocumentAndLogin();

  ngOnInit() {
    this.randomizeBalloonDelays();
  }

  randomizeBalloonDelays() {
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
      if (index === 0) {
        (balloon as HTMLElement).style.animationDelay = '0.5s';
        console.log(`Balloon ${index} delay: 0.5s`);
      } else {
        const randomDelay = Math.random() * 6;
        (balloon as HTMLElement).style.animationDelay = `${randomDelay}s`;
        console.log(`Balloon ${index} delay: ${randomDelay}s`);
      }
    });
  }

}


