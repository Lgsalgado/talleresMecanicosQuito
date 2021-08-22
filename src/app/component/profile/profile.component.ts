import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/session/auth.service';
import { FormControl, Validators } from '@angular/forms';

// User interface
export class User {
  name!: String;
  last_name!: String;
  email!: String;
  role!: String;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  UserProfile!: User;
  isLoading: boolean = true;
  constructor(public authService: AuthService) {
    this.authService.profileUser().subscribe((data: any) => {
      console.log(data);
      this.UserProfile = data;
    });
  }

  ngOnInit(): void {}
}
