import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from './user';
     
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent { 
    name= '';

    user: User;
 
    constructor(private http: HttpClient){}
      
    ngOnInit(){
          
        this.http.get('http://localhost:49716/api/academicsubjects/1').subscribe((data:User) => this.user=data);
    }
}