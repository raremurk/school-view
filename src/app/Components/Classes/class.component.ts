import { Component, OnInit } from '@angular/core';
import { Class } from '../../Models/class';
import { TeacherFullName } from '../../Models/teacherFullName';
import { Title } from '@angular/platform-browser';
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
  defaultFullNames: TeacherFullName[];
  rout = 'http://localhost:49716/api/classes';
  rout_tall = 'http://localhost:49716/api/teachers/all';
  
  constructor(private titleService: Title, private dataService: DataService,){      
  }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);  
    this.loadAllTeachers();
    this.loadAll();
  }

  loadAllTeachers() {
    this.dataService.configure(this.rout_tall);
    this.dataService.getAll().subscribe((data: TeacherFullName[]) => this.defaultFullNames = data);
    this.dataService.configure(this.rout);
  }

  loadAll() {
    this.dataService.getAll().subscribe((data: Class[]) => this.classes = data);    
  }

  editClass(p: Class) {
    this.class = p;
    this.teacherFullNames = this.defaultFullNames.filter(x => x.fullName !== this.class.classTeacherFullName);
  }

  updateClass(id: number, p: Class) {
    this.dataService.update(id, p).subscribe(data => this.loadAll());
    this.cancel();
  }

  deleteClass(p: number) {
    this.dataService.delete(p).subscribe(data => this.loadAll());
  }

  createClass(p: Class) {
    this.dataService.create(p).subscribe((data: Class) => this.classes.push(data));
    this.cancel();
  }

  cancel() {
    this.class = new Class();
    this.loadAll();
  }
} 

