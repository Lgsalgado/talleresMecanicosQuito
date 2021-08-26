import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Solicitud {
  name: string;
  address: string;
  phone: string;
  open_hour: string;
  close_hour: string;
  services: string;
  facebook: string;
  instagram: string;
  certificate: any;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  baseUrl = 'http://127.0.0.1:8000/api/request';
  constructor(private http: HttpClient) {}

  // Enviar solicitud
  crearSolicitud(solicitud: Solicitud): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', solicitud.name);
    formData.append('address', solicitud.address);
    formData.append('phone', solicitud.phone);
    formData.append('open_hour', solicitud.open_hour);
    formData.append('close_hour', solicitud.close_hour);
    formData.append(
      'services',
      JSON.stringify(Object.assign({}, solicitud.services))
    );
    formData.append('facebook', solicitud.facebook);
    formData.append('instagram', solicitud.instagram);
    formData.append('certificate', solicitud.certificate);
    console.log(formData);
    return this.http.post(this.baseUrl, formData);
  }

  // View
  viewRequest(id: any): Observable<any> {
    console.log(id);
    return this.http.get(`http://127.0.0.1:8000/api/user/request/${id}`);
  }

  // Pendientes
  pending(): Observable<any> {
    return this.http.get(this.baseUrl + 's/pending');
  }

  // Aprovados
  approved(): Observable<any> {
    return this.http.get(this.baseUrl + 's/approved');
  }

  // Rechazados
  rejected(): Observable<any> {
    return this.http.get(this.baseUrl + 's/rejected');
  }

  // Aprovar
  approve(solicitud: any): Observable<any> {
    return this.http.put(this.baseUrl + '/approve/' + solicitud, solicitud);
  }

  // Aprovar
  reject(solicitud: any): Observable<any> {
    return this.http.put(this.baseUrl + '/reject/' + solicitud, solicitud);
  }

  // Obtener por usuario
  userRequest(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/user/request');
  }
}
