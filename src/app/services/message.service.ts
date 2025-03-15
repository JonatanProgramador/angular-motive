import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../../env';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly url = ENV.getUrlServe();

  constructor(private httpClient: HttpClient) { }



  getAll() {
    const url = this.url + 'messages';
    const result = this.httpClient.get(url);
    return result;
  }

  getAllByUser() {
    const url = this.url + 'messages/user';
      const result = this.httpClient.get(url, { withCredentials: true })
      return result;
  }

  delete(id: number) {
    const url = this.url + 'messages/' + id;
    const result = this.httpClient.delete(url, { withCredentials: true })
    return result;
  }

  create(message: string) {
    const url = this.url + 'messages/';
      const result = this.httpClient.post(url, { message: message }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
      return result;
  }

  update(message: string, id: number) {
    const url = this.url + 'messages/' + id;
      const result = this.httpClient.put(url, { message: message }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
      return result;
  }
}


