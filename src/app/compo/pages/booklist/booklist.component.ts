import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransService } from 'src/app/serivce/trans.service';
import { Transaction } from '../../entity/Transaction';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  list = [];
  optionList = [0.1,0.2,0.3,1,2,5,10,20,30,40,50];
  trans:Transaction[] = [];
  interval:string = "2";
  // TRANS_URL = TRANS_URL;
  // WEIBO_URL = WEIBO_URL;
  // BAIDU_URL = BAIDU_URL;
  // JS_URL    = JS_URL   ;

  TRANS_URL = "http://localhost:8080/getrans";
  WEIBO_URL = "https://weibo.com/daxixis/home?topnav=1&wvr=6";
  BAIDU_URL = "https://www.baidu.com/";
  JS_URL = "https://www.runoob.com/js/js-type-conversion.html";

  web_list = [this.TRANS_URL,this.WEIBO_URL,this.BAIDU_URL,this.JS_URL];

  bindingURL = this.TRANS_URL;//设置默认请求地址
  
  constructor(
    //注入httpClient, 必须加修饰符private,如果不加的话，在ngOnInit()方法里不会有提示,
    private httpClient:HttpClient,
    private transervice:TransService
    ) 
    { 

    }

  ngOnInit() {
    
    this.getStadiums();
  }

  getStadiums(){
    this.httpClient.get("http://localhost:8080/getStadiums?count=5").subscribe((resp:any)=>{
      // console.log(resp);
      // console.log(resp[0].city);
      this.list = resp;
    });
  }

  
  getTrans(){
    this.transervice.sendHttp(this.bindingURL).subscribe(
      (resp => {
        console.log(resp);
        this.trans = Array.from(resp);
        console.log(resp);
      }),
      (error => {
        console.log(error);
        console.log("没有获取到transaction对象");
        console.log(error.message);
        
      })
    );


    console.log("-------------------send another request----------------------");

    this.transervice.sendHttp(this.bindingURL);
  }


  getTransByRxjs(){
    let stream = this.transervice.getTransByRxjs(this.bindingURL);
    var d = stream.subscribe(
      (resp => {
        console.log('resp from rxjs as below');
        console.log(resp);
        
      })
    );

    setTimeout(() => {
      //取消订阅
      d.unsubscribe();
    }, 1000);
  }


  getTransIntervalByRxjs(){
    let stream = this.transervice.getTransIntervalByRxjs(this.bindingURL,parseInt(this.interval));
    var d = stream.subscribe(
      ((resp:any) => {
        // console.log('getTransIntervalByRxjs resp from rxjs as below');
        // console.log(resp);
        if(!Array.isArray(resp)){
          // console.log('相应对象不是数组,即将取消订阅');
          // console.log('resp转成数组');
          // console.log(Array.from(resp.error));
          
          d.unsubscribe();
        }
      })
    );
  }


  
  

}
