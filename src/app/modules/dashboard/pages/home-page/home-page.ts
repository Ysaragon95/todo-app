import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../../../shared/components/sidebar-component/sidebar-component";

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './home-page.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomePage {}
