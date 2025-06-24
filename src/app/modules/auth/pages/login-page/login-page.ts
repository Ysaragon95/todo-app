import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent {

  // Signal para errores de login
  errorSession = signal(false);

  // Formulario reactivo
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12)
    ])
  });

  // Signal computado para saber si el formulario es inválido
  isFormInvalid = computed(() => this.formLogin.invalid);

  constructor(
    private authService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) { }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;

    if (!email || !password) return;

    this.authService.sendCredentials(email, password).subscribe({
      next: (responseOk) => {
        const { token } = responseOk;
        this.cookie.set('token', token, 4, '/');
        this.router.navigate(['/', 'tracks']);
      },
      error: () => {
        this.errorSession.set(true);
        console.error('Ocurrió error con tu email o password');
      }
    });
  }

}
