import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }



  async getAll() {
    const url = new URL('http://localhost:3000/messages');
    const result = await fetch(url)
    const data = await result.json()
    return data;
  }

  async getAllByUser() {
    const url = new URL('http://localhost:3000/messages/user');
    const result = await fetch(url, {
      credentials: 'include',
      method: 'get'
    })
    if(result.status !== 200) {
      return false;
    }
    const data = await result.json();
    return data;
  }

  async update(message:string, id:number) {
    const url = new URL('http://localhost:3000/messages/'+id);
    const result = await fetch(url, {
      credentials: 'include',
      method: 'PUT',
      body:JSON.stringify({message:message}),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    return result.status === 200;
  }
}


