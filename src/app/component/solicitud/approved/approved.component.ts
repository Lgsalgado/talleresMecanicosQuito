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
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css'],
})
export class ApprovedComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'user',
    'name',
    'created',
    'updated',
    'state',
  ];

  solicitud: Solicitud[] = [];
  dataSource: any;
  isLoading = true;
  err: any;

  constructor(public solicitudService: SolicitudService) {
    this.solicitudService.approved().subscribe((data) => {
      data.map((data: any) => {
        this.solicitud.push(data);
        this.dataSource = this.solicitud;
      });
    });
  }

  ngOnInit(): void {}
}
