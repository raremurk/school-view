import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {TeachersDialogComponent} from './Dialog/teachersDialog.component';
import {Teacher} from '../../Models/teacher';
import {AcademicSubject} from '../../Models/academicSubject';
import {Class} from '../../Models/class';
import {DataService} from '../../data.service';
     
@Component({
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss'],
    providers: [DataService]
})
export class TeachersComponent implements OnInit{ 
  title = 'Список учителей';
  teachers_route = 'teachers';
  subjects_route = 'academicsubjects';
  classes_route = 'classes';
  positions = ['Учитель','Учитель мл. классов'];  
  academicSubjects: AcademicSubject[];
  classes: Class[];
  teachers: Teacher[]; 
  teacher: Teacher = new Teacher(0, "", "", "", "");
  editableTeacher: Teacher;
     
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){  
    this.titleService.setTitle(this.title);   
    this.loadAllClasses(); 
    this.loadAllTeachers();  
    this.loadAllAcademicSubjects();  
  }

  openCreateDialog() {
    this.teacher = new Teacher(0, "", "", "", "");
    this.openDialog('Добавление учителя', 0); 
  }

  openEditDialog(teacherToEdit: Teacher) {
    this.editableTeacher = teacherToEdit;
    this.teacher = JSON.parse(JSON.stringify(teacherToEdit));
    this.openDialog('Полная информация', 1);   
  }

  openDialog(title: string, mode: number){
    this.dialog.open(TeachersDialogComponent, { data: { 
      dialogTitle : title, 
      editMode: mode,
      academicSubjects : this.academicSubjects, 
      classes: this.classes, 
      teacher : this.teacher }})
      .afterClosed().subscribe((result: Teacher)=>{
      if(result.id == 0){
        this.dataService.create(this.teachers_route, result)
        .subscribe((data: Teacher) => this.teachers.push(data));
      }
      if(result.id > 0){
        this.dataService.update(this.teachers_route, result.id, result).subscribe(() => 
        Object.assign(this.editableTeacher, result));
      }
    });
  }

  loadAllAcademicSubjects() {
    this.dataService.getAll(this.subjects_route).subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
  }

  loadAllClasses() {
    this.dataService.getAll(this.classes_route).subscribe((data: Class[]) => this.classes = data); 
  }

  loadAllTeachers() {
    this.dataService.getAll(this.teachers_route).subscribe((data: Teacher[]) => this.teachers = data);
  }

  deleteTeacher(p: number) {
    this.dataService.delete(this.teachers_route, p).subscribe(() => {
      var index = this.teachers.findIndex(d => d.id === p); 
      this.teachers.splice(index, 1);
    });
  }
}  
