import { Component, OnInit } from '@angular/core';
import {SolicitudService} from "../../../shared/solicitud/solicitud.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

export interface Solicitud {
  id: number;
  user: string;
  name: string;
  created: Date;
  state: string;
}
@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.css']
})

export class InactiveComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'user',
    'name',
    'created',
    'updated',
    'state',
    'actionsColumn'
  ];
  solicitud: Solicitud[] = [];
  dataSource: any;
  isLoading = true;
  err: any;
  constructor(public solicitudService: SolicitudService,public router: Router) {
    this.solicitudService.inactived().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
      });
    });
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
        this.router.navigate([`taller/${e.id}`]);
      }
    );
  }

  approve(e: any): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "El taller volvera a la lista de activos",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.solicitudService.complete(e.id).subscribe(
          (res) => {
            Swal.fire(
              'Solicitud aceptada!',
              'Taller Activo',
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


  ngOnInit(): void {
  }

}
