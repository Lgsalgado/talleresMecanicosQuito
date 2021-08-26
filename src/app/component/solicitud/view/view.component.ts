import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

export class User {
  name!: string;
  last_name!: string;
  email!: string;
}

export class Solicitud {
  name!: string;
  address!: string;
  phone!: string;
  open_our!: string;
  close_our!: string;
  services!: Array<any>;
  facebook!: string;
  instagram!: string;
  certificate!: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  user!: User;
  isLoading: boolean = true;

  err = null;

  constructor(
    public solicitudService: SolicitudService,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    console.log(this.activeRoute.snapshot.params.id);
    this.solicitudService
      .viewRequest(this.activeRoute.snapshot.params.id)
      .subscribe((data) => {
        this.user = data[0].user;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {}
}
