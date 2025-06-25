import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'app/modules/auth/services/auth-service';
import { MenuOption } from 'app/shared/interfaces/menuoption-interface';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-item-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-item-component.html',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SidebarItemComponent {
  isLoggingOut = false;

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Home',
      subLabel: 'Menu Principal',
      route: '/dashboard/home',
    },
    {
      icon: 'fa-solid fa-list-check',
      label: 'Tareas',
      subLabel: 'Manejo de Tareas',
      route: '/dashboard/todos',
    },
    {
      icon: 'fa-solid fa-right-from-bracket',
      label: 'Logout',
      subLabel: 'Cerrar Sesión',
      route: 'logout',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoggingOut = true;
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }, 500); // coincide con la duración de la animación
      }
    });
  }
}
