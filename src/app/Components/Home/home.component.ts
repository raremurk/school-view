import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../data.service';
import { SchoolStat } from '../../Models/SchoolStat';
  
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService]
})
export class HomeComponent {
  title = 'Главная';     
  rout_admin = 'http://localhost:49716/api/admin';
  schoolStat: SchoolStat;
  
  constructor(private titleService: Title, private dataService: DataService,){      
  }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);      
    this.loadInfo();    
  }

  loadInfo() {
    this.dataService.getAll(this.rout_admin).subscribe((data: SchoolStat) => this.schoolStat = data);
  } 

  upStudents(){
    if(confirm()){
      this.dataService.create(this.rout_admin, '').subscribe()
    }
  }
} 
