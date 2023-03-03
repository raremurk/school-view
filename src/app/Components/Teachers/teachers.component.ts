import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Teacher } from '../../Models/teacher';
import { AcademicSubject } from '../../Models/academicSubject';
import { Class } from '../../Models/class';
import { DataService } from '../../data.service';
     
@Component({
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
    providers: [DataService]
})
export class TeachersComponent implements OnInit{ 
  title = 'Список учителей';
  rout_teachers = 'http://localhost:49716/api/teachers';
  rout_as = 'http://localhost:49716/api/academicsubjects';
  rout_classes = 'http://localhost:49716/api/classes';
  positions = ['Директор','Завуч','Учитель', 'Учитель мл. классов'];  
  academicSubjects: AcademicSubject[];
  filter: {'id' : number}[];
  classes: Class[];
  buf: Teacher = new Teacher();
  teacher: Teacher = new Teacher();
  teachers: Teacher[]; 
  edit_mod: number = 0; 
     
  constructor(private titleService: Title, private dataService: DataService){}
    
  ngOnInit(){  
    this.titleService.setTitle(this.title);   
    this.loadAllClasses(); 
    this.loadAllTeachers();   
  }
  
  loadAllAcademicSubjects() {
    this.dataService.getAll(this.rout_as).subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
  }

  loadAllClasses() {
    this.dataService.getAll(this.rout_classes).subscribe((data: Class[]) => this.classes = data); 
  }

  loadAllTeachers() {
    this.dataService.getAll(this.rout_teachers).subscribe((data: Teacher[]) => this.teachers = data);
  }

  saveTeacher() {
    if (this.teacher.id == null) {
      this.dataService.create(this.rout_teachers, this.teacher).subscribe((data: Teacher) => this.teachers.push(data));
    } 
    else {
      this.dataService.update(this.rout_teachers, this.teacher.id, this.teacher).subscribe();
      Object.assign(this.buf, this.teacher);
    }
    this.cancel();
  }

  editModeOn(){
    this.edit_mod = 1;
  }

  createModeOn(){
    this.edit_mod = 2;
  }

  editTeacher(p: Teacher) {
    this.loadAllAcademicSubjects();  
    this.buf = p;
    this.teacher = JSON.parse(JSON.stringify(p));
    this.edit_mod = 0;         
  }

  deleteTeacher(p: number) {
    this.dataService.delete(this.rout_teachers, p).subscribe(data => {
      var index = this.teachers.findIndex(d => d.id === p); 
      this.teachers.splice(index, 1);
    });
  }

  addSubject() {
    this.teacher.teacherSubjects.push({'id': this.academicSubjects.filter(n => !this.teacher.teacherSubjects.some(m => m.id == n.id))[0].id});
  }

  deleteSubject(id: number) {
    let index = this.teacher.teacherSubjects.findIndex(d => d.id == id); 
    this.teacher.teacherSubjects.splice(index, 1);
  }

  viewSubject(id: number) {
    return this.academicSubjects?.find(d => d.id == id).name; 
  }

  getAcademicSubjects(p: number) {
    this.filter = this.teacher.teacherSubjects.filter(m => m.id != p);
    return this.academicSubjects.filter(n => !this.filter.some(m => m.id == n.id));
  }

  changeClassState(id: number){
    if (this.classExist(id)){
      let index = this.teacher.teacherClasses.findIndex(d => d.id == id); 
      this.teacher.teacherClasses.splice(index, 1);
    }
    else{
      this.teacher.teacherClasses.push({'id' : id});
    }      
  }

  classExist(id: number) {   
    if (this.teacher.teacherClasses.some(d => d.id == id)) {
      return true;
    }
    return false;       
  }

  cancel() {
    this.teacher = new Teacher();
  }
}  
