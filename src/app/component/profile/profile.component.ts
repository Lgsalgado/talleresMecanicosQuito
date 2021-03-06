import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/session/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

// User interface
export class User {
  name!: String;
  last_name!: String;
  email!: String;
  role!: String;
  password = null;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  UserProfile!: User;
  isLoading: boolean = true;

  profileForm: FormGroup;

  err = null;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    public router: Router
  ) {
    this.profileForm = this.fb.group({
      name: [''],
      last_name: [''],
      email: [''],
      password: [''],
    });
    this.authService.profileUser().subscribe((data: any) => {
      this.profileForm.controls['name'].setValue(data.name);
      this.profileForm.controls['last_name'].setValue(data.last_name);
      this.profileForm.controls['email'].setValue(data.email);
      this.isLoading = false;
      this.UserProfile = data;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    Swal.fire({
      title: 'Esta seguro?',
      text: "Su información será actualizada",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.authService.updateUser(this.profileForm.value).subscribe(
          (res) => {
            console.log(res);
            Swal.fire(
              'Información actualizada',
              'Esta solicitud fue aceptada',
              'success'
            )
          },
          (error) => {
            console.log(error);
            this.err = error.error;
          },
          () => {
            window.location.reload();
          }
        );
      }else { window.location.reload();}

    })

  }
}
