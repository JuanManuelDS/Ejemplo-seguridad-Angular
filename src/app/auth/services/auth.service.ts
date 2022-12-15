import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const url = 'http://localhost:8080/login';
    const body = { username, password };

    //El map me permite mutar la respuesta
    return this.http.post<AuthResponse>(url, body).pipe(
      //Lo que está en tap sucede antes que se envíe al subscribe
      tap((resp) => {
        if (resp.token) {
          localStorage.setItem('token', resp.token);
          this._usuario = { ...body };
        }
      }),
      map((resp) => resp),
      catchError((err) => {
        console.log('Error antes del subscribe ', err);
        return of(err);
      })
    );
  }

  validarToken(): Observable<boolean> {
    const url = 'http://localhost:8080/api/usuarios/verificar';
    const token = 'Bearer ' + localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      token || '' //Le envío un string vacío en caso que el token esté vacío
    );
    return this.http.get(url, { headers }).pipe(
      map((resp) => true), //Siempre que haya una respuesta que no sea un erro significa que el token es válido
      catchError((err) => of(false)) //En caso que caiga aquí siempre significa que el token no es válido
    );
  }
}
