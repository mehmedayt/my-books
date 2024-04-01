import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BooksComponent } from './books-list/books-list.component';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
