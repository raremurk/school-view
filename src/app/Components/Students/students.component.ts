import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Student } from '../../Models/student';
import { Class } from '../../Models/class';
import { DataService } from '../../data.service';

@Component({
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [DataService]
})
export class StudentsComponent implements OnInit{ 
  title = 'Список учеников';
  rout_students = 'http://localhost:49716/api/students';
  rout_classes = 'http://localhost:49716/api/classes';
  min_data = new Date(new Date().setFullYear(new Date().getFullYear() - 20));    
  max_data = new Date(new Date().setFullYear(new Date().getFullYear() - 4));
  buf: Student = new Student();  
  student: Student = new Student();
  students: Student[];  
  classes: Class[];
  
  constructor(private titleService: Title, private dataService: DataService){}
    
  ngOnInit(){  
    this.titleService.setTitle(this.title); 
    this.loadAllClasses();   
    this.loadAllStudents();
  }

  loadAllClasses() {
    this.dataService.getAll(this.rout_classes).subscribe((data: Class[]) => this.classes = data);    
  }

  loadAllStudents() {
    this.dataService.getAll(this.rout_students).subscribe((data: Student[]) => this.students = data);
  }

  saveStudent() {
    if (this.student.id == null) {
      this.dataService.create(this.rout_students, this.student)
        .subscribe((data: Student) => this.students.push(data));
    } 
    else {
      this.dataService.update(this.rout_students, this.student.id, this.student).subscribe();
      Object.assign(this.buf, this.student);
    }    
    this.cancel();
  }

  createStudent() {
    this.cancel();
  }

  editStudent(p: Student) {
    this.buf = p;
    this.student = { ...p};
  }

  deleteStudent(p: number) {
    this.dataService.delete(this.rout_students, p).subscribe(data => {
      var index = this.students.findIndex(x => x.id == p);
      this.students.splice(index, 1);
    });
  }

  cancel() {
    this.student = new Student();
  }
} 
