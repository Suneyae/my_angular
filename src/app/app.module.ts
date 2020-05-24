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

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

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
    
    NzButtonModule,
    NzTableModule,
    NzInputModule,
    NzModalModule,

    HttpClientModule, // 注册HttpClientModule模块
    NgZorroAntdModule,
    BrowserAnimationsModule 
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
