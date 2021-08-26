import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/session/auth-state.service';
import { AuthService } from 'src/app/shared/session/auth.service';
import { TokenService } from 'src/app/shared/session/token.service';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

export class User {
  role!: String;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  role!: string;
  approvedMech: boolean = false;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
    public solicitudService: SolicitudService
  ) {
    this.authService.profileUser().subscribe(
      (data: any) => {
        this.role = data.role;
      },
      (err) => {
        this.auth.setAuthState(false);
        this.token.removeToken();
        this.router.navigate(['login']);
      },
      () => {
        this.solicitudService.completed().subscribe(
          (data) => {
            this.approvedMech = true;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }

  ngOnInit(): void {}

  // Cerrar sesion
  logOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
