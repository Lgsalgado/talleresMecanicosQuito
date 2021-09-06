import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

export class Promocion {
  title!: string;
  description!: string;
  image!: any;
}

@Component({
  selector: 'app-promocionview',
  templateUrl: './promocionview.component.html',
  styleUrls: ['./promocionview.component.css'],
})
export class PromocionviewComponent implements OnInit {
  isLoading: boolean = true;

  promocionForm: FormGroup;

  err = null;

  constructor(
    public solicitudService: SolicitudService,
    private fb: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.promocionForm = this.fb.group({
      title: [''],
      description: [''],
      image: [''],
    });
    this.validatePromo();
  }

  ngOnInit(): void {}

  validatePromo(): void {
    console.log(this.activeRoute.snapshot.params.taller);
    
  }

  onSubmit(): void {}
}
