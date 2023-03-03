import { Component, OnInit } from '@angular/core';
import { Student } from '../../Models/student';
import { Class } from '../../Models/class';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../data.service';
     
@Component({
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
    providers: [DataService]
})
export class StudentsComponent implements OnInit{ 
    title = 'Список учеников';
    student: Student = new Student();
    students: Student[];
    rout = 'http://localhost:49716/api/students';
    rout_as = 'http://localhost:49716/api/classes';
    classes: Class[];
    
    constructor(private titleService: Title, private dataService: DataService){}
      
    ngOnInit(){  
      this.loadAllClasses();    
      this.titleService.setTitle(this.title); 
      this.loadAll();
    }

    loadAllClasses() {
      this.dataService.configure(this.rout_as);
      this.dataService.getAll().subscribe((data: Class[]) => this.classes = data);
      this.dataService.configure(this.rout);
    }

    loadAll() {
      this.dataService.getAll().subscribe((data: Student[]) => this.students = data);
    }

    editStudent(p: Student) {
      this.student = p; 
    }

    updateStudent(id: number, p: Student) {
      this.dataService.update(id, p).subscribe(data => this.loadAll());
      this.cancel();
    }

    deleteStudent(p: number) {
      this.dataService.delete(p).subscribe(data => this.loadAll());
    }

    createStudent(p: Student) {
      this.dataService.create(p).subscribe((data: Student) => this.students.push(data));
      this.student = new Student();
    }

    cancel() {
      this.student = new Student();
      this.loadAll();
    }
} 

