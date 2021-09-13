import { Component, OnInit } from '@angular/core';
import {Solicitud} from "../../../viewmech/viewmech.component";
import {Promocion} from "../promocionview/promocionview.component";
import {SolicitudService} from "../../../../shared/solicitud/solicitud.service";
import {PromocionService} from "../../../../shared/promocion/promocion.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Mecanica} from "../../tallerlist/tallerlist.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-proactive',
  templateUrl: './proactive.component.html',
  styleUrls: ['./proactive.component.css']
})
export class ProactiveComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'user',
    'name',
    'created',
    'updated',
    'state',
    'actionsColumn',
  ];
  mecanica: Mecanica[] = [];
  promocion: Promocion[] = [];
  dataSourceM: any;
  dataSource: any;
  isLoading = true;
  err: any;
  mechId:number=0;
  constructor(
    public solicitudService: SolicitudService,
    public promocionService: PromocionService,
    private fb: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.solicitudService.completed().subscribe((data) => {
      data.map((data: any) => {
        this.mecanica.push(data);
        this.dataSourceM = this.mecanica;
        this.mechId=this.dataSourceM[length].id;
        //Llama a las promociones activas
        this.promocionService.activedPromocion(this.mechId).subscribe((data) => {
          data.map((data: any) => {
            this.promocion.push(data);
            this.dataSource = this.promocion;
            console.log(this.dataSource)
          });
        });
      });
    });
  }

  async inactivePromo(e: any): Promise<void> {
    this.isLoading = true;
    Swal.fire({
      title: 'Esta seguro?',
      text: "Su promocion será inactivada",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.promocionService.inactivePromocion(e.id).subscribe(
          (res) => {
            Swal.fire(
              'Solicitud aceptada!',
              'La promoción será  inactivada',
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
