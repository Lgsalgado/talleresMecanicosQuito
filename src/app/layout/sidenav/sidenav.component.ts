import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthStateService } from 'src/app/shared/session/auth-state.service';
import { AuthService } from 'src/app/shared/session/auth.service';
import { TokenService } from 'src/app/shared/session/token.service';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';
import {FormBuilder} from "@angular/forms";

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
  state: string='';
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
    public solicitudService: SolicitudService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute
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
            console.log(data.length)
            if(data.length>0){
              console.log(data[length].state)
              if(data[length].state==="completado"){
                this.approvedMech = true;
              }
            }else {
              console.log("No hay talleres completados")
            }

          },
          (err) => {
            console.log(err);
          }
        );
      }
    );
  }
  openView(): void {
    this.router.navigate([
      `taller/${this.activeRoute.snapshot.params.id}/promocion`,
    ]);
  }
  ngOnInit(): void {}

  // Cerrar sesion
  logOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
