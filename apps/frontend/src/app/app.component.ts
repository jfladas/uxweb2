import { Component, inject, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './app.config'; // oder wo immer dein config ist
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderComponent],
})


export class AppComponent {
  title = 'frontend';
}
