import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-sidebar-header-component',
  imports: [],
  templateUrl: './sidebar-header-component.html',
})
export class SidebarHeaderComponent {
  envs = environment;
  userName: string | null = null;

  constructor() {
    this.userName = localStorage.getItem('userName');
  }
}
