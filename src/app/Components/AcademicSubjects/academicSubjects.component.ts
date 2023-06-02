import {Component, OnInit} from '@angular/core';
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
  buf: AcademicSubject = new AcademicSubject();
  academicSubject: AcademicSubject = new AcademicSubject();
  academicSubjects: AcademicSubject[];  
  
  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.loadAllAcademicSubjects();
  }

  openDialog() {
    this.dialog.open(AcademicSubjectsDialogComponent).afterClosed().subscribe((result: AcademicSubject)=>{
      if(result.id == 0){
        this.dataService.create(this.subjects_route, result)
        .subscribe((data: AcademicSubject) => this.academicSubjects.push(data));
      }
    })
  }

  loadAllAcademicSubjects() {
    this.dataService.getAll(this.subjects_route).subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
  }

  updateAcademicSubject() {
    this.dataService.update(this.subjects_route, this.academicSubject.id, this.academicSubject)
      .subscribe();
    Object.assign(this.buf, this.academicSubject); 
    this.cancel();
  }

  createAcademicSubject() {
    this.cancel();
    this.academicSubject.minClass = 1;
    this.academicSubject.maxClass = 11;
  }

  editAcademicSubject(p: AcademicSubject) {
    this.buf = p;
    this.academicSubject = { ...p};
  }

  deleteAcademicSubject(p: number) {
    this.dataService.delete(this.subjects_route, p).subscribe(data => {
      var index = this.academicSubjects.findIndex(x => x.id == p);
      this.academicSubjects.splice(index, 1);
    });
  }

  cancel() {    
    this.academicSubject = new AcademicSubject();
  }
} 
