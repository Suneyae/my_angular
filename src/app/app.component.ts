import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp2';
  
  products:any = [
    {name:"iPhone1",id:1,description:"this is iPhone 1"},
    {name:"iPhone2",id:2,description:"this is iPhone 2"},
    {name:"iPhone3",id:3,description:"this is iPhone se"},
    {name:"iPhone4",id:4,description:"this is iPhone 4"},
    {name:"iPhone5",id:5},
    
  ];

  share(id:string){
    console.log("iphone id "+id+" is shared")
  }
}
