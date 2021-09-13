import { Component, OnInit } from '@angular/core';
import {Mecanica} from "../../taller/tallerlist/tallerlist.component";
import {Queja, QuejaService} from "../../../shared/queja/queja.service";
import {SolicitudService} from "../../../shared/solicitud/solicitud.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-approved-queja',
  templateUrl: './approved-queja.component.html',
  styleUrls: ['./approved-queja.component.css']
})
export class ApprovedQuejaComponent implements OnInit {
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
        this.quejaService.approvedQueja(this.mechId).subscribe((data) => {
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

  async answerQueja(e: any) {
    const {value: text} = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Respuesta a queja',
      inputPlaceholder: 'Ingrese su respuesta aqui',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    if (text) {
      // @ts-ignore
      console.log(e)
      this.quejaService.ansQueja(e,text.toString()).subscribe(
        (res) => {
          Swal.fire(
            'Queja respondida',
            'La queja fue respondida',
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
      Swal.fire(text)
    }
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
  ngOnInit(): void {
  }

}
