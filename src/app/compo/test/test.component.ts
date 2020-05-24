import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  title:string = "Tour of Heros";
  myHero:string = "<em>Spider<em>";

  list:object[] = [
    {name:"morgan",sex:"male"},
    {name:"tianyang",sex:"female"},
    {name:"weilingxi",sex:"female"},
    {name:"zhangsan",sex:"male"},
    {name:"lisi",sex:"female"},
    
  ];
  list2 = ["table","chair","cloth"];

  showEvent(e:Event){
    //show the event object
    console.log("鼠标事件详情如下:");
    console.log(e);
    //e.srcElement.formAction,可以通过这个属性获取到当前的url地址
    // console.log("当前请求url为"+e.srcElement.formAction);
    aa:MouseEvent;
    if(Array.isArray(e)){
      console.log("是数组");
    }else{
      console.log("不是数组");
    }

    if( e instanceof MouseEvent){
      console.log("是MouseEvent类型");
    }else{
      console.log("不是MouseEvent类型");
    }

  }
  login(){
    window.localStorage.setItem("autho_token","abc");
  }

  loginOut(){
    window.localStorage.removeItem("autho_token");
    this.router.navigate(['login']);
  }


  getToken():string{
    return window.localStorage.getItem("autho_token");
  }

  ifLogin(){
    let token = this.getToken();
    if(null==token || ""==token){
      console.log('没有登录');
      return false;
    }else{
      console.log('已登录');
      return true;
    }
  }
  
  constructor(private router:Router) { }

  ngOnInit() {
  }

}
