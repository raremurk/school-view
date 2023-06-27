import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {StudentsDialogComponent} from './Dialog/studentsDialog.component';
import {Student} from '../../Models/student';
import {Class} from '../../Models/class';
import {DataService} from '../../data.service';

@Component({
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [DataService]
})
export class StudentsComponent implements OnInit{ 
  title = 'Список учеников';
  students_route = 'students';
  classes_route = 'classes';
  min_data = new Date(new Date().setFullYear(new Date().getFullYear() - 20));    
  max_data = new Date(new Date().setFullYear(new Date().getFullYear() - 4));
  classes: Class[];
  students: Student[];    
  student: Student = new Student(0, "", "", "", "", "", 1);
  editableStudent: Student;  
  
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){  
    this.titleService.setTitle(this.title); 
    this.loadAllClasses();   
    this.loadAllStudents();
  }

  openDialog() {
    this.dialog.open(StudentsDialogComponent).afterClosed().subscribe((result: Student)=>{
      if(result.id == 0){
        this.dataService.create(this.students_route, result)
        .subscribe((data: Student) => this.students.push(data));
      }
    });
  }

  loadAllClasses() {
    this.dataService.getAll(this.classes_route).subscribe((data: Class[]) => this.classes = data);    
  }

  loadAllStudents() {
    this.dataService.getAll(this.students_route).subscribe((data: Student[]) => this.students = data);
  }

  editStudent(stud: Student) {
    this.student = stud;
    this.editableStudent = { ...stud};    
  }

  updateStudent() {
    this.dataService.update(this.students_route, this.editableStudent.id, this.editableStudent).subscribe(() => {
      Object.assign(this.student, this.editableStudent); 
      this.cancel();
    });
  }

  deleteStudent(p: number) {
    this.dataService.delete(this.students_route, p).subscribe(() => {
      var index = this.students.findIndex(x => x.id == p);
      this.students.splice(index, 1);
    });
  }

  cancel() {
    this.editableStudent.id = 0;
  }
} 
