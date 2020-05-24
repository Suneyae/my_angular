import { Component, OnInit } from '@angular/core';
//导入当前路由
import { ActivatedRoute } from '@angular/router'
//导入路由切换方法
import { Location } from '@angular/common'
@Component({
  selector: 'app-stadium',
  templateUrl: './stadium.component.html',
  styleUrls: ['./stadium.component.css']
})
export class StadiumComponent implements OnInit {
  id_stadim = null;
  constructor(
    private route: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      item =>{
        this.id_stadim = item.id;
      }
    )
  }

}
