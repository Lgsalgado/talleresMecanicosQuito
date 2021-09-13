import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Promocion {
  mech_id:number;
  title: string;
  description: string;
  image: string;
  state:string;

}

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  user_id:number=0;
  baseUrl = 'http://127.0.0.1:8000/api/promocion';
  constructor(private http: HttpClient) { }

  // Crear Promocion
  crearPromocion(promocion: Promocion,mechId:number): Observable<any> {
    const formData: FormData = new FormData();
    console.log(mechId)
    // @ts-ignore
    formData.append('mech_id', mechId);
    formData.append('title', promocion.title);
    formData.append('description', promocion.description);
    formData.append('image', promocion.image);

    return this.http.post(this.baseUrl, formData);
  }

  // Activar promocion
  activePromocion(promocion: any): Observable<any> {
    return this.http.put(this.baseUrl + '/active/' + promocion, promocion);
  }
  activedPromocion(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 's/actived/'+id);
  }
  // Inactivar promocion
  inactivePromocion(promocion: any): Observable<any> {
    return this.http.put(this.baseUrl + '/inactive/' + promocion, promocion);
  }
  // Inactivos
  inactivedPromocion(id:number): Observable<any> {
    return this.http.get(this.baseUrl + 's/inactived/'+id);
  }

}
