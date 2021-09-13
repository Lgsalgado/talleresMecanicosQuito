import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';
import {PromocionService} from "../../../../shared/promocion/promocion.service";
import Swal from "sweetalert2";
import {Mecanica} from "../../tallerlist/tallerlist.component";

export class Promocion {
  mech_id!:number;
  title!: string;
  description!: string;
  image!: any;
  state!:any;
}

@Component({
  selector: 'app-promocionview',
  templateUrl: './promocionview.component.html',
  styleUrls: ['./promocionview.component.css'],
})
export class PromocionviewComponent implements OnInit {
  isLoading: boolean = true;
  mecanica: Mecanica[] = [];
  dataSource: any;
  promocionForm: FormGroup;
  err = null;
  mechId:number=0;
  constructor(
    public solicitudService: SolicitudService,
    public promocionService: PromocionService,
    private fb: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.promocionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.solicitudService.completed().subscribe((data) => {
      data.map((data: any) => {
        this.mecanica.push(data);
        this.dataSource = this.mecanica;
        this.mechId=this.dataSource[length].id
        console.log(this.mechId)
      });
    });
  }
  onFileSelect(e: any) {
    console.log('test');
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.promocionForm.controls['image'].setValue(file);
    }
  }
  ngOnInit(): void {}


  onSubmit(): void {
    console.log(this.promocionForm.value);
    this.isLoading = true;

    this.promocionService.crearPromocion(this.promocionForm.value,this.mechId).subscribe(
      (res) => {
        Swal.fire({
          title: 'Promoción ingresada',
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
        this.promocionForm.reset();
      }
    );
  }
}
