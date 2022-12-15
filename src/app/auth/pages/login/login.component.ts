import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  miFormulario: FormGroup = this.formBuilder.group({
    username: ['juanmads', Validators.required],
    password: ['123456', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    const { username, password } = this.miFormulario.value;
    this.authService.login(username, password).subscribe((resp) => {
      if (resp.token) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error', 'Contraseña y/o usuario incorrectos', 'error');
      }
    });
  }
}
