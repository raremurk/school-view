import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../Models/teacher';
import { AcademicSubject } from '../../Models/academicSubject';
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
    defaultAcademicSubjects: AcademicSubject[];
    rout = 'http://localhost:49716/api/teachers';
    rout_as = 'http://localhost:49716/api/academicsubjects';
    positions: string[];
    default = ['Директор','Завуч','Учитель']; 
    id: number;   
      
    constructor(private titleService: Title, private dataService: DataService){}
      
    ngOnInit(){      
      this.loadAllAcademicSubjects();
      this.titleService.setTitle(this.title);  
      this.loadAll();
    }
    

    loadAllAcademicSubjects() {
      this.dataService.configure(this.rout_as);
      this.dataService.getAll().subscribe((data: AcademicSubject[]) => this.defaultAcademicSubjects = data);
      this.dataService.configure(this.rout);
    }

    loadAll() {
      this.dataService.getAll().subscribe((data: Teacher[]) => this.teachers = data);
    }

    editTeacher(p: Teacher) {
      this.teacher = p;
      this.positions = this.default.filter(obj => obj !== this.teacher.position);   
      this.academicSubjects = this.defaultAcademicSubjects.filter(obj => obj.name !== this.teacher.academicSubjectName);  
    }

    updateTeacher(id: number, p: Teacher) {
      this.dataService.update(id, p).subscribe(data => this.loadAll());
      this.cancel();
    }

    deleteTeacher(p: number) {
      this.dataService.delete(p).subscribe(data => this.loadAll());
    }

    createTeacher(p: Teacher) {
      this.dataService.create(p).subscribe((data: Teacher) => this.teachers.push(data));
      this.teacher = new Teacher();
    }

    cancel() {
      this.teacher = new Teacher();
      this.loadAll();
    }
} 

