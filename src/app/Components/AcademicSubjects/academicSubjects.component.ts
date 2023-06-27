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
  academicSubjects: AcademicSubject[];  
  academicSubject: AcademicSubject = new AcademicSubject(0, "", 1, 11);
  editableSubject: AcademicSubject;
  
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
    });
  }

  loadAllAcademicSubjects() {
    this.dataService.getAll(this.subjects_route).subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
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
      var index = this.academicSubjects.findIndex(x => x.id == p);
      this.academicSubjects.splice(index, 1);
    });
  }

  cancel() {    
    this.editableSubject.id = 0;
  }
} 
