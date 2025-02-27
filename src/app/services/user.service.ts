import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private permised:boolean = false;

  readonly url = "http://localhost:3000/";

  constructor() { }

  getPermised() {
    return this.permised;
  }
  setPermised(permised:boolean) {
    this.permised = permised;
  }

  async isAuth() {
    const result = await fetch(this.url+'auth', {
      method:'get',
      credentials: 'include',
    })
    const data = await result.json();
    this.permised = data.result;
  }

  async login(name:string, password:string) {
    let auth = btoa(name+":"+password);
    const result = await fetch(this.url+'login', {
      method:'post',
      credentials: 'include',
      headers: { "Content-Type": "application/json",
        'Authorization': `Basic ${auth}`
     }
    })
   if(result.status===200) {
    this.permised = true;
    return true;
   } else {
    return false
   }
  }
}

