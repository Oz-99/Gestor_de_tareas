import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit() {

    console.log(this.loginForm.value);
    
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log('Login exitoso', response);

        // 🔍 Log para verificar si llega token
        console.log('Token recibido:', response.token);

        if (response.token) {
          localStorage.setItem('token', response.token);
        } else {
          console.error('⚠️ No se recibió token en la respuesta');
        }

        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error en el login', error);
        alert('Credenciales incorrectas. Por favor, intenta de nuevo.');
      }
    );
  }
}
}
