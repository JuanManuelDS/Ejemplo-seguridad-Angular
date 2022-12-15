import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  formularioRegistro: FormGroup = this.formBuilder.group({
    username: ['juanma', Validators.required],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    password2: ['123456', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  register() {
    console.log(this.formularioRegistro.value);
    console.log(this.formularioRegistro.valid);

    this.router.navigateByUrl('/dashboard');
  }
}
