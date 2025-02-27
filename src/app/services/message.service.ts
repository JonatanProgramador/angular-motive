import { Injectable } from '@angular/core';
import { tokenInterceptor } from '../interceptors/tokenInterceptor';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly url = "http://localhost:3000/";

  constructor(private httpClient:HttpClient) { }



  getAll() {
    const url = this.url+'messages';
    const result = this.httpClient.get(url);
    return result;
  }

  async getAllByUser() {
    const url = new URL(this.url+'messages/user');
    const result = await tokenInterceptor(url, {
      method: 'get'
    })
    if(result && result.status !== 200) {
      return false;
    }
    const data = await result?.json();
    return data;
  }

  async delete(id:number) {
    const url = new URL(this.url+'messages/'+id);
    const result = await tokenInterceptor(url, {
      method: 'DELETE'
    });
    return result && result.status === 200;
  }

  async create(message:string) {
    const url = new URL(this.url+'messages/');
    const result = await tokenInterceptor(url, {
      method: 'POST',
      body:JSON.stringify({message:message}),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    return result && result.status === 201? await result.json():false;
  }

  async update(message:string, id:number) {
    const url = new URL(this.url+'messages/'+id);
    const result = await tokenInterceptor(url, {
      method: 'PUT',
      body:JSON.stringify({message:message}),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    return result && result.status === 200;
  }
}


