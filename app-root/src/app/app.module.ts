import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginModule } from '../login/login.module';
import { EditModule } from '../edit/edit.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, LoginModule, EditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
