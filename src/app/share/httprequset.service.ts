import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { IAdd, IUser } from './request.model';

@Injectable({
  providedIn: 'root'
})
export class HttprequsetService {

  apiRoot=environment.apiRoot;
  constructor(private http:HttpClient) { }

  OnGetRequests(){
    return this.http.get(`${this.apiRoot}/Admission/Requests`);
  }
  OnGetCountries(){
    return this.http.get(`${this.apiRoot}/Countries`);
  }
  onAddRequest(requestobj: object){
    return this.http.post<IAdd>(`${this.apiRoot}/Admission/Requests/add`, requestobj);
  }
  onGetRequest(id:number){
    return this.http.get(`${this.apiRoot}/Admission/Request/${id}`);
  }

  onPostUploadfile(fd : FormData){
      return this.http.post(`${this.apiRoot}/Admission/document/upload`, fd);
    }
    onAuthenticate(authenticateobj: object){
      return this.http.post<IUser>(`${this.apiRoot}/Users/Authenticate`, authenticateobj);
    }
​
  onPut(id:number){

    return this.http.put(`${this.apiRoot}/Admission/Requests/${id}/Approve`,null);
  }


​
}
