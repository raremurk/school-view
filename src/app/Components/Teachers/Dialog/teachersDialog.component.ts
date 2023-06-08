import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AcademicSubject} from '../../../Models/academicSubject';
import {Teacher} from '../../../Models/teacher';
import {Class} from '../../../Models/class';

@Component({
    templateUrl: 'teachersDialog.component.html',
    styleUrls: ['./teachersDialog.component.scss']
  })
export class TeachersDialogComponent{
  teacherSubjectsIds: number[]= [];
  teacherClassesIds: number[]= [];
  disabled: boolean;

  constructor(public dialogRef: MatDialogRef<TeachersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      dialogTitle: string, 
      editMode: number,
      academicSubjects: AcademicSubject[], 
      classes: Class[], 
      teacher: Teacher}) 
  {
    this.teacherSubjectsIds = this.data.teacher.teacherSubjects.map(p => p.id);
    this.teacherClassesIds = this.data.teacher.teacherClasses.map(p => p.id);
    this.disabled = this.data.editMode == 1;
  } 
  
  saveTeacher() {
    this.data.teacher.teacherSubjects = this.teacherSubjectsIds.map(p => ({id: p}));
    this.data.teacher.teacherClasses = this.teacherClassesIds.map(p => ({id: p}));
    this.dialogRef.close(this.data.teacher);
  }

  enableEdit(){
    this.data.dialogTitle = 'Редактирование данных';
    this.data.editMode = 2;
    this.disabled = false;
  }

  removeSubject(id: number) {
    this.teacherSubjectsIds.splice(this.teacherSubjectsIds.indexOf(id), 1);
    this.teacherSubjectsIds = [...this.teacherSubjectsIds];
  }

  getSubjectNameById(id: number) {
    return this.data.academicSubjects.find(d => d.id == id).name; 
  }
}