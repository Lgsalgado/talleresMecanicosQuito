import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

@Component({
  selector: 'app-afiliacion',
  templateUrl: './afiliacion.component.html',
  styleUrls: ['./afiliacion.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AfiliacionComponent implements OnInit {
  // Declaración de servicios
  serv: Array<any> = [
    {
      name: 'Mecánica',
      value: 'Mecánica',
    },
    {
      name: 'Hojalateria y pintura automotriz',
      value: 'Hojalateria y pintura automotriz',
    },
    {
      name: 'Electricidad automotriz',
      value: 'Electricidad automotriz',
    },
    {
      name: 'Escáner',
      value: 'Escáner',
    },
    {
      name: 'Estética automotriz',
      value: 'Estética automotriz',
    },
    {
      name: 'Venta y montaje de llantas',
      value: 'Venta y montaje de llantas',
    },
  ];

  solicitudForm: FormGroup;

  isLoading: boolean = false;
  err: any;

  constructor(
    public solicitudService: SolicitudService,
    private fb: FormBuilder
  ) {
    this.solicitudForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      open_hour: ['', [Validators.required]],
      close_hour: ['', [Validators.required]],
      services: this.fb.array([], [Validators.required]),
      otro: [''],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      certificate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onCheckboxChange(e: any) {
    const services: FormArray = this.solicitudForm.get('services') as FormArray;

    if (e.target.checked) {
      services.push(new FormControl(e.target.value));
    } else {
      const index = services.controls.findIndex(
        (x) => x.value === e.target.value
      );
      services.removeAt(index);
    }
  }

  onFileSelect(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.solicitudForm.controls['certificate'].setValue(file);
    }
  }

  onSubmit(): void {
    console.log(this.solicitudForm.value);
    this.isLoading = true;
    if (this.solicitudForm.value.otro.length > 0) {
      const otherServices = this.solicitudForm.value.otro.split(',');
      console.log(otherServices);
      otherServices.map((serv: any) => {
        this.solicitudForm.value.services.push(serv);
      });
    }
    this.solicitudService.crearSolicitud(this.solicitudForm.value).subscribe(
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
