import { Component, OnInit } from '@angular/core';
import {Solicitud} from "../../solicitud/pending/pending.component";
import {Queja, QuejaService} from "../../../shared/queja/queja.service";
import {SolicitudService} from "../../../shared/solicitud/solicitud.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Mecanica} from "../../taller/tallerlist/tallerlist.component";

@Component({
  selector: 'app-pending-queja',
  templateUrl: './pending-queja.component.html',
  styleUrls: ['./pending-queja.component.css']
})
export class PendingQuejaComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'user',
    'title',
    'description',
    'created',
    'state',
    'actionsColumn',
  ];
  mecanica:Mecanica[]=[];
  queja: Queja[] = [];
  dataSource: any;
  dataSourceM: any;
  isLoading = true;
  err: any;
  mechId:number=0;
  constructor(public quejaService: QuejaService,
              public solicitudService:SolicitudService,
              public router: Router) {
    this.solicitudService.completed().subscribe((data) => {
      data.map((data: any) => {
        this.mecanica.push(data);
        this.dataSourceM = this.mecanica;
        this.mechId=this.dataSourceM[length].id;
        this.quejaService.pendingQueja(this.mechId).subscribe((data) => {
          data.map((data: any) => {
            this.queja.push(data);
            this.dataSource = this.queja;
            console.log(this.dataSource)
          });
        });
        //Llama a las promociones activas
      });
    });

  }

  ngOnInit(): void {
  }

  async inactiveQuejas(e: any): Promise<void> {
    this.isLoading = true;
    Swal.fire({
      title: 'Esta seguro?',
      text: "Su  será rechazada",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.quejaService.rejectQueja(e.id).subscribe(
          (res) => {
            Swal.fire(
              'Solicitud aceptada!',
              'La queja fue rechazada',
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
      }else { window.location.reload();}
    })
  }

  async approveQuejas(e: any): Promise<void> {
    this.isLoading = true;
    Swal.fire({
      title: 'Esta seguro?',
      text: "Su queja será aprobada",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.quejaService.approveQueja(e.id).subscribe(
          (res) => {
            Swal.fire(
              'Solicitud aceptada!',
              'La queja fue aceptada',
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
      }else { window.location.reload();}
    })
  }

  view(e: any): void {
    this.quejaService.viewRequestQueja(e.id).subscribe(
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
