import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';
import Swal from "sweetalert2";

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
    })

  }

  async reject(): Promise<void> {
    const {value: text} = await Swal.fire({
      title: 'Estas seguro?',
      text: "Esta solicitud será rechazada, escriba la razón del rechazo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Rechazar',
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Escriba la razón aqui',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
    })
    if (text) {
      Swal.fire(text).then((result) => {

        if (result.isConfirmed) {
          // @ts-ignore
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
      })
    }

  }
}
