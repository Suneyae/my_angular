import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooklistComponent } from './compo/pages/booklist/booklist.component';
import { HomeComponent } from './compo/pages/home/home.component';
import { RaceComponent } from './compo/pages/race/race.component';
//导入三个组件， 视频url https://www.bilibili.com/video/BV1Sz4y1R7n9?from=search&seid=13446139057641881824， 3小时入门angular教程-下-路由篇-2020最新
import { StadiumComponent } from './compo/pages/stadium/stadium.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TestComponent } from './compo/test/test.component';
import { LoginComponent } from './compo/login/login.component';

/**
 * angular命令：
 * ng g c compo/pages/booklist
 * ng g c compo/pages/home
 * ng g c compo/pages/race
 * ng g c compo/pages/stadium
 * 
 */
const routes: Routes = [
  {path:"booklist", component:BooklistComponent},
  {path:"home", component:HomeComponent},
  {path:"race", component:RaceComponent},
  {path:"test", component:TestComponent},
  {path:"login",component:LoginComponent},
  /*stadium路由是带参数的，比如 localhost:4200/stadium/521, 那么在 
  StadiumComponent ts里就可以通过路由的subscrible来获取到这个值
  */
  {path:"stadium/:id", component:StadiumComponent},
  //假如是空,那么重定向到 home， 全匹配,也就是全为空
  // {path:"", redirectTo:"/home",pathMatch:"full"},
  
  //设置三个路由，默认为 home主页

  {path:"product/:productId", component:ProductDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
