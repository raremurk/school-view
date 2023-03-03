import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Class } from '../../Models/class';
import { TeacherFullName } from '../../Models/teacherFullName';
import { DataService } from '../../data.service';
     
@Component({
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [DataService]
})
export class ClassComponent implements OnInit{ 
  title = 'Список классов';
  class: Class = new Class();
  classes: Class[];    
  teacherFullNames: TeacherFullName[];
  rout = 'http://localhost:49716/api/classes';
  rout_teachers = 'http://localhost:49716/api/teachers/all';
  
  constructor(private titleService: Title, private dataService: DataService){      
  }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);  
    this.loadAll();
  }

  loadAll() {
    this.dataService.configure(this.rout_teachers);
    this.dataService.getAll().subscribe((data: TeacherFullName[]) => this.teacherFullNames = data);
    this.dataService.configure(this.rout);
    this.dataService.getAll().subscribe((data: Class[]) => this.classes = data);    
  }

  editClass(p: Class) {
    this.class = p;
  }

  updateClass(id: number, p: Class) {
    this.dataService.update(id, p).subscribe(data => this.loadAll());
    this.cancel();
  }

  cancel() {
    this.class = new Class();
  }
} 

