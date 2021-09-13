import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Queja{
  id: string;
  mech_id:number;
  user_id:number;
  title: string;
  description: string;
  answer:string;
  state:string;
  created_at:string;
}

@Injectable({
  providedIn: 'root'
})
export class QuejaService {
  user_id:number=0;

  baseUrl = 'http://127.0.0.1:8000/api/queja';
  constructor(private http: HttpClient) {}

  // Pendientes
  pendingQueja(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 's/'+id+'/pending');
  }
  // Aprobadas
  approvedQueja(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 's/'+id+'/approved');
  }
  // Aprobadas
  rejectedQueja(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 's/'+id+'/rejected');
  }
  // Aprobar
  approveQueja(solicitud: any): Observable<any> {
    return this.http.put(this.baseUrl + '/approve/' + solicitud, solicitud);
  }
  // Rechazar
  rejectQueja(solicitud: any): Observable<any> {
    return this.http.put(this.baseUrl + '/reject/' + solicitud, solicitud);
  }
  // Responder queja

  ansQueja( queja:any, answer:string): Observable<any> {
    return this.http.put(this.baseUrl + '/answer/' + queja.id, {'answer':answer});
  }
  // View
  viewRequestQueja(id: any): Observable<any> {
    console.log(id);
    return this.http.get(this.baseUrl + '/' + id, id);
  }
}
