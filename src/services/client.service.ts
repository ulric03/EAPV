import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ClientJPV } from 'src/models/client';


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url = 'Client';

  constructor(private http: HttpClient) {}

  public getClient(id:number): Observable<ClientJPV> {
    return this.http.get<ClientJPV>(`${environment.apiUrl}/${this.url}/Get/${id}`)
    .pipe(map((client,i)=> {
       client.dateBirth = new Date(client.dateBirth);
       return client;
    }));
  }

  public getClients(): Observable<ClientJPV[]> {
    return this.http.get<ClientJPV[]>(`${environment.apiUrl}/${this.url}/GetAll`);
  }

  public updateClient(client: ClientJPV): Observable<ClientJPV[]> {
    return this.http.put<ClientJPV[]>(
      `${environment.apiUrl}/${this.url}/Update`,
      client
    );
  }

  public createClient(client: ClientJPV): Observable<ClientJPV[]> {
    return this.http.post<ClientJPV[]>(
      `${environment.apiUrl}/${this.url}/Insert`,
      client
    );
  }

  public deleteClient(client: ClientJPV): Observable<ClientJPV[]> {
    return this.http.delete<ClientJPV[]>(
      `${environment.apiUrl}/${this.url}/Delete/${client.id}`
    );
  }
}
