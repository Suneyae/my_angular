import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //this ng model object
  binding:string;
  constructor(private router:Router,private mod:FormsModule) { }
  
  ngOnInit() {
  }

  checkBinding(){
    if(this.binding == "morgan"){
      console.log('have binded:'+this.binding);
    }else{
      console.log('have not bind:'+this.binding);
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



}
