import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, of } from 'rxjs';
import { Trainer } from '../models/trainer.model';
import { environment } from '../../environments/environment.development';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  // Login
  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username).pipe(
      switchMap((trainer: Trainer | undefined) => {
        if (trainer === undefined) {
          return this.createUser(username);
        }
        return of(trainer);
      })
    );
  }
  // Check if user exists
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http
      .get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(map((response: Trainer[]) => response.pop()));
  }
  // If not user - create a user
  private createUser(username: string): Observable<Trainer> {
    const trainer = {
      username,
      pokemon: [],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http.post<Trainer>(apiTrainers, trainer, {
      headers,
    });
  }
  // If user || created user - store user

  // Logout
}
