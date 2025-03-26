import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Auth: Obtiene el token
  sendRequest(): Observable<string> {
    const url = `${environment.url}/api/auth`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'instance': environment.instance,
      'user': environment.user,
      'password': environment.password
    });

    return this.http.post<any>(url, {}, { headers }).pipe(
      tap((response: any) => {
        if (response && response.result && response.result.AccessToken) {
          localStorage.setItem('accessToken', response.result.AccessToken);
        }
      }),
      // Retornar el token directamente
      map(response => response.result.AccessToken)
    );
  }

  // Eliminar token
  removeAccessToken(): void {
    localStorage.removeItem('accessToken');
  }

  // Create Pyme: Usar el token obtenido para hacer la llamada
  createPyme(params: any): Observable<any> {
    return this.sendRequest().pipe(
      tap((accessToken) => {
        const url = `${environment.url}/api/partner/pyme/create`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });

        const body = { params };
        return this.http.post(url, body, { headers }).pipe(
          tap(() => this.removeAccessToken())  // Eliminar token después de usarlo
        );
      })
    );
  }

  // Create Carries: Usar el token obtenido para hacer la llamada
  createCarries(params: any): Observable<any> {
    return this.sendRequest().pipe(
      tap((accessToken) => {
        const url = `${environment.url}/api/partner/carrier/create`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });

        return this.http.post(url, params, { headers }).pipe(
          tap(() => this.removeAccessToken())  // Eliminar token después de usarlo
        );
      })
    );
  }

  // Create Producers: Usar el token obtenido para hacer la llamada
  createProducers(params: any): Observable<any> {
    return this.sendRequest().pipe(
      tap((accessToken) => {
        const url = `${environment.url}/api/partner/producers/create`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });

        return this.http.post(url, { params }, { headers }).pipe(
          tap(() => this.removeAccessToken())  // Eliminar token después de usarlo
        );
      })
    );
  }
}
