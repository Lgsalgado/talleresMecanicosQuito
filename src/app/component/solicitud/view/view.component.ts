import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

export class User {
  name!: string;
  last_name!: string;
  email!: string;
}

export class Solicitud {
  name!: string;
  address!: string;
  phone!: string;
  open_hour!: string;
  close_hour!: string;
  services!: Array<any>;
  facebook!: string;
  instagram!: string;
  certificate!: string;
  state!: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  solicitud!: Solicitud;
  user!: User;
  isLoading: boolean = true;
  servicios: string[] = [];
  image!: string;

  err = null;

  constructor(
    public solicitudService: SolicitudService,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.solicitudService
      .viewRequest(this.activeRoute.snapshot.params.id)
      .subscribe((data) => {
        this.user = data.user;
        this.solicitud = data;
        this.image = `http://localhost:8000/${data.certificate}`;
        this.servicios = JSON.parse(data.services);
        this.isLoading = false;
      });
  }

  ngOnInit(): void {}

  approve(): void {
    this.solicitudService
      .approve(this.activeRoute.snapshot.params.id)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
          this.err = error.error;
        },
        () => {
          window.location.reload();
        }
      );
  }

  reject(): void {
    this.solicitudService.reject(this.activeRoute.snapshot.params.id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.err = error.error;
      },
      () => {
        window.location.reload();
      }
    );
  }
}
