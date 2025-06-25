import { Component } from '@angular/core';
import { SidebarHeaderComponent } from "../sidebar-header-component/sidebar-header-component";
import { SidebarItemComponent } from "../sidebar-item-component/sidebar-item-component";

@Component({
  selector: 'app-sidebar-component',
  imports: [SidebarHeaderComponent, SidebarItemComponent],
  templateUrl: './sidebar-component.html',
})
export class SidebarComponent {

}
