import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'bc-toolbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="openMenu.emit()">
        <md-icon>menu</md-icon>
      </button>
      <ng-content></ng-content>
    </md-toolbar>
  `,
  styles: [`
    md-toolbar {
      padding-left: 0px;
      min-height:64px;
    }
  `]
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
