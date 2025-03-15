import { HttpClient } from '@angular/common/http';
import { booleanAttribute, Injectable } from '@angular/core';
import { ENV } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private permised:boolean = false;

  readonly url = ENV.getUrlServe();

  constructor(private httpClient:HttpClient) { }

  getPermised() {
    return this.permised;
  }
  setPermised(permised:boolean) {
    this.permised = permised;
  }

  isAuth() {
    const result = this.httpClient.get(this.url+'auth',{withCredentials:true})
    result.subscribe((data)=>{
      this.permised = "result" in data?data.result as boolean:this.permised;
    });
  }

  login(name:string, password:string) {
    let auth = btoa(name+":"+password);
    const result = this.httpClient.post(this.url+'login', {}, {withCredentials:true, headers:{'Authorization': `Basic ${auth}`}})
    return result;
  }

  logout() {
    const result = this.httpClient.post(this.url+'logout',{},{withCredentials:true});
    result.subscribe((data)=> {
      this.permised = false;
    })
  }

  register(name:string, password:string) {
    const result = this.httpClient.post(this.url+'register', {name:name, password:password});
    return result;
  }
}

