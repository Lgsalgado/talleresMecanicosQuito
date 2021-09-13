import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthStateService } from 'src/app/shared/session/auth-state.service';
import { AuthService } from 'src/app/shared/session/auth.service';
import { TokenService } from 'src/app/shared/session/token.service';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';
import {FormBuilder} from "@angular/forms";
import {Mecanica} from "../../component/taller/tallerlist/tallerlist.component";

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
  mecanica: Mecanica[] = [];
  dataSource: any;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,
    public solicitudService: SolicitudService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {
    this.solicitudService.completed().subscribe((data) => {
      data.map((data: any) => {
        this.mecanica.push(data);
        this.dataSource = this.mecanica;
        console.log(this.dataSource[length].id)
      });
    });

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
            if(data.length>0){
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
      `taller/${this.dataSource[length].id}/promocion`,
    ]);
  }
  openViewN(): void {
    this.router.navigate([
      `notificaciones`,
    ]);
  }
  openViewQ(): void {
    this.router.navigate([
      `quejas`,
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
