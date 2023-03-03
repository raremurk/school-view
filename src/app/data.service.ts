import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class DataService {
 
    constructor(private http: HttpClient) {
    }
 
    getAll(url: string){
        return this.http.get(url);
    }
     
    getOne(url: string, id: number){
        return this.http.get(url + '/' + id);
    }
     
    create(url: string, object){
        return this.http.post(url, object);
    }

    delete(url: string, id: number){
        return this.http.delete(url + '/' + id);
    }

    update(url: string, id: number, object){
        return this.http.put(url + '/' + id, object);
    }
}
