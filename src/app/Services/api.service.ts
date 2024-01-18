import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private apiUrl = 'http://localhost:3000/api'
private apiUrl2 = 'http://localhost:3000/api'
  constructor( private http: HttpClient) { }

createUser(user: any):Observable<any>{
  return this.http.post<any>(this.apiUrl+'/usersPost', user)
}

getUsers(): Observable<any[]>{

  return this.http.get<any[]>(this.apiUrl + '/usersGet')
}

updateUser(userId: string, updatedUser: any): Observable<any>{
  this.apiUrl2 = 'http://localhost:3000/api/userPut'
  const updatedUrl =`${this.apiUrl2}/${userId}`;
  return this.http.put<any>(updatedUrl, updatedUser )
}

deleteUser(userId: string): Observable<any>{
  const deleteUrl =`${this.apiUrl}/usersDelete/${userId}`;
  return this.http.delete<any>(deleteUrl)
}

}
