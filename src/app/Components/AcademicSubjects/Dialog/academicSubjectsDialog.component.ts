import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AcademicSubject} from '../../../Models/academicSubject';

@Component({
    templateUrl: 'academicSubjectsDialog.component.html',
    styleUrls: ['./academicSubjectsDialog.component.scss']
  })
export class AcademicSubjectsDialogComponent{
  academicSubject: AcademicSubject = new AcademicSubject(-1,"", 1, 11);

  constructor(public dialogRef: MatDialogRef<AcademicSubjectsDialogComponent>) { }

  createAcademicSubject() {
    this.academicSubject.id = 0;
    this.dialogRef.close(this.academicSubject);
  }
}