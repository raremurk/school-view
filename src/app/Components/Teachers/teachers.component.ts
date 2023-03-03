import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../Models/teacher';
import { AcademicSubject } from '../../Models/academicSubject';
import { Class } from '../../Models/class';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../data.service';
     
@Component({
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
    providers: [DataService]
})
export class TeachersComponent implements OnInit{ 
    title = 'Список учителей';
    teacher: Teacher = new Teacher();
    teachers: Teacher[];
    academicSubjects: AcademicSubject[];
    classes: Class[];
    rout = 'http://localhost:49716/api/teachers';
    rout_as = 'http://localhost:49716/api/academicsubjects';
    rout_cl = 'http://localhost:49716/api/classes';
    positions = ['Директор','Завуч','Учитель'];  
    edit_mod: number = 0;
    pidaras: number = 0;
    indexes: number[] = [];
      
    constructor(private titleService: Title, private dataService: DataService){}
      
    ngOnInit(){      
      this.loadAllAcademicSubjects();
      this.titleService.setTitle(this.title); 
      this.loadAllClasses(); 
      this.loadAll();   
    }
    
    loadAllClasses() {
      this.dataService.configure(this.rout_cl);
      this.dataService.getAll().subscribe((data: Class[]) => this.classes = data); 
    }    

    loadAllAcademicSubjects() {
      this.dataService.configure(this.rout_as);
      this.dataService.getAll().subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
    }

    loadAll() {
      this.dataService.configure(this.rout);
      this.dataService.getAll().subscribe((data: Teacher[]) => this.teachers = data);
    }

    editModeOn(){
      this.edit_mod = 1;
    }

    createModeOn(){
      this.edit_mod = 2;
    }

    editTeacher(p: Teacher) {
      this.teacher = p;  
      this.edit_mod = 0;         
    }

    updateTeacher(id: number, p: Teacher) {
      this.dataService.update(id, p).subscribe();
      this.edit_mod = 0;
    }

    deleteTeacher(p: number) {
      this.dataService.delete(p).subscribe();
      let index = this.teachers.findIndex(d => d.id === p); 
      this.teachers.splice(index, 1);
    }

    deleteSubject(id: number) {
      let index = this.teacher.teacherSubjects.findIndex(d => d.id == id); 
      this.teacher.teacherSubjects.splice(index, 1);
    }

    addSubject() {
      this.teacher.teacherSubjects.push({'id': this.academicSubjects[0].id});
    }

    viewSubject(id: number) {
      return this.academicSubjects?.find(d => d.id == id).shortName; 
    }

    changeState(id: number){
      if (this.classExist(id) == "btn-primary"){
        let index = this.teacher.teacherClasses.findIndex(d => d.id === id); 
        this.teacher.teacherClasses.splice(index, 1);
      }
      else{
        this.teacher.teacherClasses.push({'id' : id});
      }      
    }

    classExist(id: number) {
      for (var index = 0; index < this.teacher.teacherClasses?.length; ++index) {        
        if (id == this.teacher.teacherClasses[index].id) {
          this.pidaras++;
          console.log(this.pidaras);
          return "btn-primary";
        }
      } 
      return "btn-outline-dark";       
    }

    createTeacher(p: Teacher) {
      this.dataService.create(p).subscribe((data: Teacher) => this.teachers.push(data));
      this.cancel();
    }

    cancel() {      
      this.teacher = new Teacher();
      this.loadAll();
    }
} 

