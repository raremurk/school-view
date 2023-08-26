import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Title} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {AcademicSubject} from '../../Models/academicSubject';
import {AcademicSubjectsDialogComponent} from './Dialog/academicSubjectsDialog.component';
import {DataService} from '../../data.service';

@Component({
  templateUrl: './academicSubjects.component.html',
  styleUrls: ['./academicSubjects.component.scss'],
  providers: [DataService]
})
export class AcademicSubjectsComponent implements OnInit{ 
  title = 'Список предметов';     
  subjects_route = 'academicsubjects';
  academicSubject: AcademicSubject = new AcademicSubject(0, "", 1, 11);
  editableSubject: AcademicSubject = new AcademicSubject(0, "", 1, 11);
  classes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  dataSource: MatTableDataSource<AcademicSubject> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'classes', 'operations'];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.loadAllAcademicSubjects();
  }

  openDialog() {
    this.dialog.open(AcademicSubjectsDialogComponent, { autoFocus: 'dialog', width: '428px'})
    .afterClosed().subscribe((result: AcademicSubject) => {
      if(result.id == 0){
        this.dataService.create(this.subjects_route, result)
        .subscribe({next:(createdSubject: any) => this.dataSource.data = [...this.dataSource.data, createdSubject]});
      }
    });
  }
    
  loadAllAcademicSubjects() {
    this.dataService.getAll(this.subjects_route).subscribe({next:(data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    }});    
  }

  editAcademicSubject(subject: AcademicSubject) {
    this.academicSubject = subject;
    this.editableSubject = { ...subject}; 
  }

  updateAcademicSubject() {
    this.dataService.update(this.subjects_route, this.editableSubject.id, this.editableSubject).subscribe(() => {
      Object.assign(this.academicSubject, this.editableSubject); 
      this.cancel();
    });
  }  

  deleteAcademicSubject(p: number) {
    this.dataService.delete(this.subjects_route, p).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id == p);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  cancel() {    
    this.editableSubject.id = 0;
  }

  getCssClasses(subject: AcademicSubject, classId: number){
    let Cssclasses: string[] = [];
    if(classId >= subject.minClass && classId <= subject.maxClass){
      Cssclasses.push('primary-color');
    }
    if(classId == subject.minClass){
      Cssclasses.push('rounded-s-xl');
    }
    if(classId == subject.maxClass){
      Cssclasses.push('rounded-e-xl');
    }
    return Cssclasses.join(' ');
  }
} 
