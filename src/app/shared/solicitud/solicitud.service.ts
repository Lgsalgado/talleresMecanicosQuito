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
  user_id:number=0;
  baseUrl = 'http://127.0.0.1:8000/api/request';
  constructor(private http: HttpClient) {}

  // Enviar solicitud
  crearSolicitud(solicitud: Solicitud): Observable<any> {
    const formData: FormData = new FormData();
    // @ts-ignore
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
  crearSolicitudAdmin(solicitud: Solicitud, userId:number){
    const formData: FormData = new FormData();
    console.log(userId)
    // @ts-ignore
    formData.append('user_id', userId);
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
    return this.http.post(this.baseUrl+'a', formData);
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
  approvedA(): Observable<any> {
    return this.http.get(this.baseUrl + 's/approveds');
  }


  // Rechazados
  rejected(): Observable<any> {
    return this.http.get(this.baseUrl + 's/rejected');
  }

  // Aprovar
  approve(solicitud: any): Observable<any> {
    return this.http.put(this.baseUrl + '/approve/' + solicitud, solicitud);
  }

  // Rechazar
  reject(solicitud: any): Observable<any> {
    return this.http.put(this.baseUrl + '/reject/' + solicitud, solicitud);
  }

  // Completar
  complete(solicitud: any): Observable<any> {
    console.log(solicitud+" id enviado a la api")
    return this.http.put(this.baseUrl + '/complete/' + solicitud, solicitud);
  }

  // Registros completados
  completed(): Observable<any> {
    return this.http.get(this.baseUrl + 's/completed/');
  }

  // Obtener por usuario
  userRequest(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/user/request');
  }

  tallerInfo(taller: any): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/taller/' + taller, taller);
  }

  tallerUpdate(id: number, taller: any): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/taller/' + id, taller);
  }
  tallerDelete(id: number, taller: any): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/request/' + id, taller);
  }
}
