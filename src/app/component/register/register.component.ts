import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/session/auth.service';
import { TokenService } from 'src/app/shared/session/token.service';
import Swal from "sweetalert2";
import {ErrorStateMatcher} from "@angular/material/core";
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  err = null;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    private token: TokenService
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {}

  onSubmit() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Su registro será enviado",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.authService.register(this.signupForm.value).subscribe(
          (res) => {
            Swal.fire(
              'Solicitud aceptada!',
              'Esta solicitud fue aceptada',
              'success'
            )
            this.responseHandler(res);
          },
          (error) => {
            this.err = error.error;
          },
          () => {
            this.signupForm.reset();
            this.router.navigate(['login']);
          }
        );
      }
    })

  }

  responseHandler(jwt: { access_token: string }) {
    this.token.handleData(jwt.access_token);
  }
}
