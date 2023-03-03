import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AcademicSubject } from './Models/academicSubject';
 
@Injectable()
export class DataService {
 
    private url = 'http://localhost:49716/api/academicsubjects';

    httpOptions = {
        headers: new HttpHeaders({    
        'Content-Type': 'application/json'    
        })    
    }
 
    constructor(private http: HttpClient) {
    }
 
    getAll(){
        return this.http.get(this.url);
    }
     
    getOne(id: number){
        return this.http.get(this.url + '/' + id, this.httpOptions);
    }
     
    create(object: AcademicSubject){
        return this.http.post(this.url, object, this.httpOptions);
    }

    delete(id: number){
        return this.http.delete(this.url + '/' + id, this.httpOptions);
    }

    update(object: AcademicSubject){
        return this.http.put(this.url, object, this.httpOptions);
    }
}



  

  





