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
    teacher: Teacher = new Teacher(1,'','','','',[],[]);
    teachers: Teacher[];
    academicSubjects: AcademicSubject[];
    classes: Class[];
    rout = 'http://localhost:49716/api/teachers';
    rout_as = 'http://localhost:49716/api/academicsubjects';
    rout_cl = 'http://localhost:49716/api/classes';
    positions = ['Директор','Завуч','Учитель'];  
    edit_mod: number = 0;
    pidaras: number = 0;
      
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
    }

    updateTeacher(id: number, p: Teacher) {
      this.dataService.update(id, p).subscribe(data => this.loadAll());
      this.cancel();
    }

    deleteTeacher(p: number) {
      this.dataService.delete(p).subscribe(data => this.loadAll());
    }

    deleteSubject(id: number) {
      let index = this.teacher.academicSubjects.findIndex(d => d.id === id); 
      this.teacher.academicSubjects.splice(index, 1);
    }

    addSubject() {
      this.teacher.academicSubjects.push({'id' : 2});
    }

    viewSubject(id: number) {
      return this.academicSubjects.find(d => d.id === id).shortName; 
    }

    changeState(id: number){
      if (this.classExist(id) == "btn-primary"){
        let index = this.teacher.classes.findIndex(d => d.id === id); 
        this.teacher.classes.splice(index, 1);
      }
      else{
        this.teacher.classes.push({'id' : id});
      }      
    }

    classExist(id: number) {
      for (var index = 0; index < this.teacher.classes?.length; ++index) {        
        if (id == this.teacher.classes[index].id) {
          this.pidaras++;
          console.log(this.pidaras);
          return "btn-primary";
        }
      } 
      return "btn-outline-dark";       
    }

    createTeacher(p: Teacher) {
      this.dataService.create(p).subscribe((data: Teacher) => this.teachers.push(data));
      this.teacher = new Teacher();
    }

    cancel() {
      this.teacher = new Teacher(1,'','','','',[],[]);
      this.edit_mod = 0;
      this.loadAll();
    }
} 

