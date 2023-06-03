import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Student} from '../../../Models/student';

@Component({
    templateUrl: 'studentsDialog.component.html',
    styleUrls: ['./studentsDialog.component.scss']
  })
export class StudentsDialogComponent{
  minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 20));    
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 4));
  student: Student = new Student(-1, "", "", "", "", "", 1);
  classes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  constructor(public dialogRef: MatDialogRef<StudentsDialogComponent>) { }

  createStudent() {
    this.student.id = 0;
    this.dialogRef.close(this.student);
  }
}