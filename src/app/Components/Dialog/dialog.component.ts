import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AcademicSubject} from '../../Models/academicSubject';

@Component({
    templateUrl: 'dialog.component.html',
    styleUrls: ['./dialog.component.scss']
  })
export class DialogComponent{
  academicSubject: AcademicSubject = new AcademicSubject(-1,"", 1, 11);

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  createAcademicSubject() {
    this.academicSubject.id = 0;
    this.dialogRef.close(this.academicSubject);
  }
}