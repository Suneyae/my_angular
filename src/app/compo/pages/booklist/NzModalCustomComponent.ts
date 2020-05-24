import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
    selector: 'nz-modal-custom-component',
    template: `
      <div>
        <h2>{{ title }}</h2>
        <h4>{{ subtitle }}</h4>
        <p>
          <span>Get Modal instance in component</span>
          <button nz-button [nzType]="'primary'" (click)="destroyModal()">destroy modal in the component</button>
        </p>
      </div>
    `
  })

  export class NzModalCustomComponent {
    @Input() title?: string;
    @Input() subtitle?: string;
  
    constructor(private modal: NzModalRef) {}
  
    destroyModal(): void {
      this.modal.destroy({ data: 'this the result data' });
    }
  }