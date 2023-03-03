import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class DataService {
    
    url: string = 'https://school228.somee.com/api/';

    constructor(private http: HttpClient) {
    }
 
    getAll(route: string){
        return this.http.get(this.url + route);
    }
     
    getOne(route: string, id: number){
        return this.http.get(this.url + route + '/' + id);
    }
     
    create(route: string, object){
        return this.http.post(this.url + route, object);
    }

    delete(route: string, id: number){
        return this.http.delete(this.url + route + '/' + id);
    }

    update(route: string, id: number, object){
        return this.http.put(this.url + route + '/' + id, object);
    }
}
