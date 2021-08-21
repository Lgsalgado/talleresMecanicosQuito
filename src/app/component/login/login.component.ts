import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/session/auth.service';
import { TokenService } from 'src/app/shared/session/token.service';
import { AuthStateService } from 'src/app/shared/session/auth-state.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthStateService,
    private token: TokenService,
    private jwtService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.jwtService.login(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
        console.log(error);
      },
      () => {
        this.authService.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['profile']);
      }
    );
  }

  // Handle response
  responseHandler(jwt: { access_token: string }) {
    console.log(jwt.access_token);
    this.token.handleData(jwt.access_token);
  }
}
