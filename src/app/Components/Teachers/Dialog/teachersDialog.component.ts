import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AcademicSubject} from '../../../Models/academicSubject';
import {Teacher} from '../../../Models/teacher';
import {Class} from '../../../Models/class';

@Component({
    templateUrl: 'teachersDialog.component.html',
    styleUrls: ['./teachersDialog.component.scss']
  })
export class TeachersDialogComponent implements OnInit{ 
  teacherSubjectsIds: number[]= [];
  teacherClassesIds: number[]= [];

  constructor(public dialogRef: MatDialogRef<TeachersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      dialogTitle: string, 
      editMode: boolean,
      academicSubjects: AcademicSubject[], 
      classes: Class[], 
      teacher: Teacher}) { }

  ngOnInit(){  
    this.teacherSubjectsIds = this.data.teacher.teacherSubjects.map(p => p.id);
    this.teacherClassesIds = this.data.teacher.teacherClasses.map(p => p.id);
  }
  
  saveTeacher() {
    if(this.data.teacher.specialization == 'Учитель старших классов'){
      this.data.teacher.teacherSubjects = this.teacherSubjectsIds.map(p => ({id: p}));
    }
    else{
      this.data.teacher.teacherSubjects = [];
    }
    this.data.teacher.teacherClasses = this.teacherClassesIds.map(p => ({id: p}));
    this.dialogRef.close(this.data.teacher);
  }

  enableEdit(){
    this.data.dialogTitle = 'Редактирование данных';
    this.data.editMode = true;
  }

  removeSubject(id: number) {
    this.teacherSubjectsIds.splice(this.teacherSubjectsIds.indexOf(id), 1);
    this.teacherSubjectsIds = [...this.teacherSubjectsIds];
  }

  getSubjectNameById(id: number) {
    let subject = this.data.academicSubjects.find(x => x.id == id);
    return subject != undefined ? subject.name : '';
  }
}