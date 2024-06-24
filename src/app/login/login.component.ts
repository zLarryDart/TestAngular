import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('username') usernameRef!: ElementRef;
  @ViewChild('password') passwordRef!: ElementRef;
  @ViewChild('rememberMe') rememberMeRef!: ElementRef;

  passwordVisible = false;
  passwordHasValue = false;

  constructor(private apiService: ApiService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordRef.nativeElement.type = this.passwordVisible ? 'text' : 'password';
  }

  onPasswordInput() {
    this.passwordHasValue = this.passwordRef.nativeElement.value.length > 0;
  }

  onSubmit() {
    const username = this.usernameRef.nativeElement.value;
    const password = this.passwordRef.nativeElement.value;
    const rememberMe = this.rememberMeRef.nativeElement.checked;

    this.apiService.login(username, password).subscribe(response => {
      localStorage.setItem('authToken', response.token);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      this.router.navigate(['/']);  // Redirigir a la página principal después del inicio de sesión
    }, error => {
      console.error('Login failed', error);
    });
  }
}
