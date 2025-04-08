import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FavoritenComponent } from './components/favoriten/favoriten.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent, // Ensure SidebarComponent is declared here
    FavoritenComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
