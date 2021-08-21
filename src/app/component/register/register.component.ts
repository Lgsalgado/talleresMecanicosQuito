import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/session/auth.service';
import { TokenService } from 'src/app/shared/session/token.service';

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

  ngOnInit(): void {}

  onSubmit() {
    this.authService.register(this.signupForm.value).subscribe(
      (res) => {
        this.responseHandler(res);
      },
      (error) => {
        this.err = error.error;
      },
      () => {
        console.log(this.signupForm);
        this.signupForm.reset();
        this.router.navigate(['login']);
      }
    );
  }

  responseHandler(jwt: { access_token: string }) {
    this.token.handleData(jwt.access_token);
  }
}
