import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

export interface Solicitud {
  id: number;
  user: string;
  name: string;
  created: Date;
  state: string;
}

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'user',
    'name',
    'created',
    'state',
    'actionsColumn',
  ];
  solicitud: Solicitud[] = [];
  dataSource: any;
  isLoading = true;
  err: any;

  constructor(
    public solicitudService: SolicitudService,
    public router: Router
  ) {
    this.solicitudService.pending().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
      });
    });
  }

  ngOnInit(): void {}

  approve(e: any): void {
    this.solicitudService.approve(e.id).subscribe(
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

  reject(e: any): void {
    this.solicitudService.reject(e.id).subscribe(
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
        this.router.navigate([`solicitud/${e.id}`]);
      }
    );
  }
}
