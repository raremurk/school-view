import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
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
  academicSubjects: AcademicSubject[] = [];
  classes: Class[] = [];
  teacher: Teacher = new Teacher(0, '', '', '', '', '');
  editableTeacher: Teacher = new Teacher(0, '', '', '', '', '');

  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'subjects', 'operations'];
  dataSource: MatTableDataSource<Teacher> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort = new MatSort();
   
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){  
    this.titleService.setTitle(this.title);
    this.loadAllAcademicSubjects();    
    this.loadAllClasses(); 
    this.loadAllTeachers();     
  }

  openCreateDialog() {
    this.teacher = new Teacher(0, '', '', '', 'Учитель старших классов', '');
    this.openDialog('Добавление учителя', true); 
  }

  openEditDialog(teacherToEdit: Teacher) {
    this.editableTeacher = teacherToEdit;
    this.teacher = JSON.parse(JSON.stringify(teacherToEdit));
    this.openDialog('Полная информация', false);   
  }

  openDialog(title: string, mode: boolean){
    this.dialog.open(TeachersDialogComponent, { autoFocus: 'dialog', data: { 
      dialogTitle : title, 
      editMode: mode,
      academicSubjects : this.academicSubjects.filter(s => s.maxClass > 4), 
      classes: this.classes, 
      teacher : this.teacher }})
      .afterClosed().subscribe((result: Teacher)=>{
      if(result.id == 0){
        this.dataService.create(this.teachers_route, result)
        .subscribe({next:(createdTeacher: any) => this.dataSource.data = [...this.dataSource.data, createdTeacher]});
      }
      if(result.id > 0){
        this.dataService.update(this.teachers_route, result.id, result).subscribe(() => 
        Object.assign(this.editableTeacher, result));
      }
    });
  }

  loadAllAcademicSubjects() {
    this.dataService.getAll(this.subjects_route).subscribe({next:(data: any) => this.academicSubjects = data});
  }

  loadAllClasses() {
    this.dataService.getAll(this.classes_route).subscribe({next:(data: any) => this.classes = data}); 
  }

  loadAllTeachers() {
    this.dataService.getAll(this.teachers_route).subscribe({next:(data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    }});   
  }

  deleteTeacher(id: number) {
    this.dataService.delete(this.teachers_route, id).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id == id);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  getSubjectNameById(id: number) {
    let subject = this.academicSubjects.find(x => x.id == id);
    return subject != undefined ? subject.name : '';
  }
}  
