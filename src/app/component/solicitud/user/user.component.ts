import { Component, OnInit } from '@angular/core';
import { SolicitudService } from 'src/app/shared/solicitud/solicitud.service';

export interface Solicitud {
  id: number;
  user: string;
  name: string;
  created: Date;
  state: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'created',
    'updated',
    'state',
    'actionsColumn',
  ];

  solicitud: Solicitud[] = [];
  dataSource: any;
  isLoading = true;
  err: any;

  constructor(public solicitudService: SolicitudService) {
    this.solicitudService.userRequest().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
      });
    });
  }

  ngOnInit(): void {}

  completeRegister(e: any): void {
    console.log(e)
    this.solicitudService.complete(e.id).subscribe(
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
