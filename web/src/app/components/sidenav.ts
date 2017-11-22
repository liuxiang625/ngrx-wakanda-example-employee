import { Component, Input } from '@angular/core';

@Component({
  selector: 'bc-sidenav',
  template: `
    <md-sidenav mode="over" #sidenav [opened]="open">
      <md-nav-list>
        <ng-content></ng-content>
      </md-nav-list>
    </md-sidenav>
  `,
  styles: [`
    md-sidenav {
      min-width:220px;
    }
  `]
})
export class SidenavComponent {
  @Input() open = false;
}
