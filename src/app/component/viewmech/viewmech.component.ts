import { Component, OnInit } from '@angular/core';
import {SolicitudService} from "../../shared/solicitud/solicitud.service";
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
  selector: 'app-viewmech',
  templateUrl: './viewmech.component.html',
  styleUrls: ['./viewmech.component.css']
})

export class ViewmechComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'user',
    'name',
    'created',
    'updated',
    'state',
    'actionsColumn',
  ];
  solicitud: Solicitud[] = [];
  dataSource: any;
  isLoading = true;
  err: any;
  constructor(public solicitudService: SolicitudService,public router: Router) {
    this.solicitudService.approvedA().subscribe((data) => {
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
  async deleteMech(e: any): Promise<void> {
    const {value: text} = await Swal.fire({
      title: 'Estas seguro?',
      text: "Este taller sera eliminado de la lista de talleres",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminas',
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
          this.solicitudService.tallerDelete(e.id).subscribe(
            (res) => {
              Swal.fire(
                'Solicitud aceptada!',
                'El taller fue eliminado',
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

  ngOnInit(): void {
  }

}
