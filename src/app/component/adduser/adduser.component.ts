import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/session/auth.service';
import { TokenService } from 'src/app/shared/session/token.service';
import Swal from "sweetalert2";
import {Solicitud} from "../solicitud/user/user.component";
import {SolicitudService} from "../../shared/solicitud/solicitud.service";
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
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
  num: number=0;
  userId:number=0;
  isLoading: boolean = false;
  err: any;
  solicitud: Solicitud[] = [];
  dataSource: any;
  signupForm: FormGroup;
  constructor(
    public solicitudService: SolicitudService,
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService,
    private token: TokenService
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      last_name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });
    this.solicitudService.userRequest().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
        this.num=(this.dataSource.length-1);
        console.log("hola")
        console.log(this.dataSource.length)
      });
    });
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

  ngOnInit(): void {
  }
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
    this.solicitudService.crearSolicitudAdmin(this.solicitudForm.value,this.userId).subscribe(
      (res) => {
        Swal.fire({
          title: 'Taller aprobado',
          width: 600,
          padding: '3em',
          background: '#fff url(/images/trees.png)',
          backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `
        })
        console.log(res);
      },
      (error) => {
        console.log(error);
        this.err = error.error;
      },
      () => {
        window.location.reload();
        this.signupForm.reset();
      }
    );
  }
  onSubmitU() {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este usuario será registrado",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.authService.register(this.signupForm.value).subscribe(
          (res) => {
            this.userId=res.user.id;
            console.log(this.userId);
            Swal.fire(
              'Usuario Aceptado!',
              'El usuario fue registrado',
              'success'
            )
          },
          (error) => {
            this.err = error.error;
          },
          () => {
            // @ts-ignore
            this.signupForm.reset();
            //this.router.navigate(['profile']);
          }
        );
      }
    })

  }
}
