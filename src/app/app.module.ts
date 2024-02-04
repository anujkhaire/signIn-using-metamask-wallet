import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AbstractAuthService } from './services/abstract.auth.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ { provide: AbstractAuthService, useClass: AuthService} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
