import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

export interface Mecanica {
  id: number;
  name: string;
  created: Date;
  state: string;
}

@Component({
  selector: 'app-tallerlist',
  templateUrl: './tallerlist.component.html',
  styleUrls: ['./tallerlist.component.css'],
})
export class TallerlistComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'created',
    'updated',
    'actionsColumn',
  ];

  mecanica: Mecanica[] = [];
  dataSource: any;
  isLoading = true;
  err: any;

  constructor(
    public solicitudService: SolicitudService,
    public router: Router
  ) {
    this.solicitudService.completed().subscribe((data) => {
      data.map((data: any) => {
        this.mecanica.push(data);
        this.dataSource = this.mecanica;
        console.log(this.dataSource[length].id)
      });
    });
  }

  ngOnInit(): void {}

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
}
