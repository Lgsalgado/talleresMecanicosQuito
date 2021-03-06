import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from "sweetalert2";

export class Mecanica {
  name!: string;
  address!: string;
  phone!: string;
  open_hour!: string;
  close_hour!: string;
  services!: string;
  facebook!: string;
  instagram!: string;
}

@Component({
  selector: 'app-tallerview',
  templateUrl: './tallerview.component.html',
  styleUrls: ['./tallerview.component.css'],
})
export class TallerviewComponent implements OnInit {
  isLoading: boolean = true;

  mecanicaForm: FormGroup;

  err = null;

  constructor(
    public solicitudService: SolicitudService,
    private fb: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.mecanicaForm = this.fb.group({
      name: [''],
      address: [''],
      phone: [''],
      open_hour: [''],
      close_hour: [''],
    });
    this.solicitudService
      .tallerInfo(this.activeRoute.snapshot.params.id)
      .subscribe((data: any) => {
        this.mecanicaForm.controls['name'].setValue(data.name);
        this.mecanicaForm.controls['address'].setValue(data.address);
        this.mecanicaForm.controls['phone'].setValue(data.phone);
        this.mecanicaForm.controls['open_hour'].setValue(data.open_hour);
        this.mecanicaForm.controls['close_hour'].setValue(data.close_hour);
        this.isLoading = false;
      });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.isLoading = true;
    Swal.fire({
      title: 'Esta seguro?',
      text: "Su información del taller será modificada",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.solicitudService
          .tallerUpdate(
            this.activeRoute.snapshot.params.id,
            this.mecanicaForm.value
          )
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
      }else {this.isLoading = false;}
    })

  }

  openView(): void {
    this.router.navigate([
      `taller/${this.activeRoute.snapshot.params.id}/promocion`,
    ]);
  }
}
