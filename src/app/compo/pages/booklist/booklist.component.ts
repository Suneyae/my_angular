import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransService } from 'src/app/serivce/trans.service';
import { Transaction } from '../../entity/Transaction';

//对话框相关
import { Input, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzModalCustomComponent } from './NzModalCustomComponent';

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
    private modal: NzModalService, // 对话框相关
    private transervice:TransService
    ) 
    { 

    }

  ngOnInit() {
    
    this.getStadiums();

    //分隔符
    this.listOfData = new Array(200).fill(0).map((_, index) => {
      return {
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      };
    });
    //分隔符
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


  
  


  //分割符
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ItemData[] = [];
  listOfData: ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }




  //对话框相关 begin
  tplModal?: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;
  disabled = false;


  createModal(): void {
    this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: 'string, will close after 1 sec',
      nzClosable: false,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        value: 'Template Context'
      },
      nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal(): void {
    this.tplModalButtonLoading = true;
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      this.tplModal!.destroy();
    }, 1000);
  }

  createComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: NzModalCustomComponent,
      nzGetContainer: () => document.body,
      nzComponentParams: {
        title: 'title in component',
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'change component title from outside',
          onClick: componentInstance => {
            componentInstance!.title = 'title in inner component is changed';
          }
        }
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  createCustomButtonModal(): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'custom button demo xxx',
      // nzContent: 'pass array of button config to nzFooter to create multiple buttons yyy<> <a>aaa</a> ',
      // nzContent: '<select> <option value=1>1</option></select>',
      nzContent: 'remark:<input nz-input placeholder="修改年龄" >',
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy()
        },
        {
          label: 'Confirm',
          type: 'primary',
          onClick: () => this.modal.confirm({ nzTitle: 'Confirm Modal Title', nzContent: 'Confirm Modal Content' })
        },
        {
          label: 'Change Button Status',
          type: 'danger',
          loading: false,
          onClick(): void {
            this.loading = true;
            setTimeout(() => (this.loading = false), 1000);
            setTimeout(() => {
              this.loading = false;
              this.disabled = true;
              this.label = 'can not be clicked！';
            }, 2000);
          }
        },
        {
          label: 'async load',
          type: 'dashed',
          onClick: () => new Promise(resolve => setTimeout(resolve, 2000))
        }
      ]
    });
  }

  openAndCloseAll(): void {
    let pos = 0;

    ['create', 'info', 'success', 'error'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        nzMask: false,
        nzTitle: `Test ${method} title`,
        nzContent: `Test content: <b>${method}</b>`,
        nzStyle: { position: 'absolute', top: `${pos * 70}px`, left: `${pos++ * 300}px` }
      })
    );

    this.htmlModalVisible = true;

    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));

    setTimeout(() => this.modal.closeAll(), 2000);
  }
  
  //对话框相关 end

}
