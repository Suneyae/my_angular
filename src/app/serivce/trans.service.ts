import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransService {

  constructor(private httpClient:HttpClient) { }

  getStadiums(){
    this.httpClient.get("http://localhost:8080/getrans").subscribe((resp:any)=>{
      // console.log(resp);
      // console.log(resp[0].city);
      // this.list = resp;
    });
  }

  sendHttp(url:string):any{
    // this.httpClient.get(url).toPromise();
    return this.httpClient.get(url);
  }


  sendHttpbyPost(url:string):any{
    // this.httpClient.get(url).toPromise();

  //   res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  let header = new Headers();
  // header.append("Access-Control-Allow-Origin", "*");
  // header.append('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  // header.append("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // header.append("X-Powered-By", ' 3.2.1');
  // header.append("Content-Type", "application/json;charset=utf-8");
  header.append("Access-Control-Allow-Origin", "*");
header.append("Access-Control-Allow-Credentials", "true");
header.append("Access-Control-Allow-Methods", "*");
header.append("Access-Control-Allow-Headers", "Content-Type,Access-Token");
header.append("Access-Control-Expose-Headers", "*");

header.append("Access-Control-Allow-Headers","Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With,Token");
    return this.httpClient.post(url,{header});
  }


  getTransByRxjs(url:string){
    let stream = 
    new Observable(observer => {
      setTimeout(() => {
        this.sendHttp(url).subscribe(
          resp =>{
            /*
            set the asynchronous response result as the in 
            parameter for next method
            把异步请求获取到的返回值作为入参传给observer对象,
            然后再外部通过 stream对象的subscribe对象就可以拿到
            通过next传入的值,
            可以简单的理解为 这里的next方法是把值set进去,
            外部调用用的subscribe方法就可以把值get出来
            */
            observer.next(resp);
          }
        )
      },
      2000);
    }
    );
    
    return stream;
  }


  getTransIntervalByRxjs(url:string,interval:number){
    let count = 0;
    let stream = 
    new Observable(observer => {
      setInterval(() => {
        
        this.sendHttpbyPost(url).subscribe(
          resp =>{
            /*
            set the asynchronous response result as the in 
            parameter for next method
            把异步请求获取到的返回值作为入参传给observer对象,
            然后再外部通过 stream对象的subscribe对象就可以拿到
            通过next传入的值,
            可以简单的理解为 这里的next方法是把值set进去,
            外部调用用的subscribe方法就可以把值get出来
            */
            observer.next(resp);
            if(count<10){
              console.log('请求间隔'+interval+'秒, getTransIntervalByRxjs 第'+count+'次请求');
            }
            count++;
          },
          error => {
            observer.next(error);
          }
        )
        
      },
      1000*interval);
      
    }
    );
    
    return stream;
  }


}
