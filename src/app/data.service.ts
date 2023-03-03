import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
 
@Injectable()
export class DataService {
 
    private url: string;

    httpOptions = {
        headers: new HttpHeaders({    
        'Content-Type': 'application/json'    
        })    
    }
 
    constructor(private http: HttpClient) {
    }

    configure(rout: string) {
        this.url = rout;
    }
 
    getAll(){
        return this.http.get(this.url);
    }
     
    getOne(id: number){
        return this.http.get(this.url + '/' + id, this.httpOptions);
    }
     
    create(object){
        return this.http.post(this.url, object, this.httpOptions);
    }

    delete(id: number){
        return this.http.delete(this.url + '/' + id, this.httpOptions);
    }

    update(id: number, object){
        return this.http.put(this.url + '/' + id, object, this.httpOptions);
    }
}



  

  





