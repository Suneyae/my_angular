import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//引入HttpClientModule模块,用于发送http请求
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './compo/pages/home/home.component';
import { BooklistComponent } from './compo/pages/booklist/booklist.component';
import { RaceComponent } from './compo/pages/race/race.component';
import { StadiumComponent } from './compo/pages/stadium/stadium.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StadiumsComponent } from './compo/entity/stadiums/stadiums.component';
import { TestComponent } from './compo/test/test.component';
import { LoginComponent } from './compo/login/login.component';

import { FormsModule } from '@angular/forms';
import { AppviewComponent } from './appview/appview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooklistComponent,
    RaceComponent,
    StadiumComponent,
    ProductDetailsComponent,
    StadiumsComponent,
    TestComponent,
    LoginComponent,
    AppviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule // 注册HttpClientModule模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
