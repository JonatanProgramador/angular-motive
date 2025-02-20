import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private permised:boolean = false;


  constructor() { }

  getPermised() {
    return this.permised;
  }
  setPermised(permised:boolean) {
    this.permised = permised;
  }

  async login(name:string, password:string) {
    let auth = btoa(name+":"+password);
    const result = await fetch('http://localhost:3000/login', {
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

