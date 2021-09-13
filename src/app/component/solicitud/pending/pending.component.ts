import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';
import Swal from "sweetalert2";

export interface Solicitud {
  id: number;
  user: string;
  name: string;
  created: Date;
  state: string;
}

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'user',
    'name',
    'created',
    'state',
    'actionsColumn',
  ];
  solicitud: Solicitud[] = [];
  dataSource: any;
  isLoading = true;
  err: any;

  constructor(
    public solicitudService: SolicitudService,
    public router: Router
  ) {
    this.solicitudService.pending().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
      });
    });
  }

  ngOnInit(): void {}

  approve(e: any): void {
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
        this.solicitudService.approve(e.id).subscribe(
          (res) => {
            Swal.fire(
              'Solicitud aceptada!',
              'Esta solicitud fue aceptada',
              'success'
            )
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

  async reject(e: any): Promise<void> {
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
          // @ts-ignore
          this.solicitudService.reject(e.id).subscribe(
            (res) => {
              Swal.fire(
                'Solicitud aceptada!',
                'Esta solicitud fue aceptada',
                'success'
              )
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

  view(e: any): void {
    this.solicitudService.viewRequest(e.id).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.err = error.error;
      },
      () => {
        this.router.navigate([`solicitud/${e.id}`]);
      }
    );
  }
}
