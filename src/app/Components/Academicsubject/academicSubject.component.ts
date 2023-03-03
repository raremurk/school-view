import { Component, OnInit } from '@angular/core';
import { AcademicSubject } from '../../Models/academicSubject';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../data.service';
     
@Component({
  templateUrl: './academicSubject.component.html',
  styleUrls: ['./academicSubject.component.scss'],
  providers: [DataService]
})
export class AcademicSubjectComponent implements OnInit{ 
  title = 'Список предметов';
  academicSubject: AcademicSubject = new AcademicSubject();
  academicSubjects: AcademicSubject[];    
  rout = 'http://localhost:49716/api/academicsubjects';
  
  constructor(private titleService: Title, private dataService: DataService,){      
  }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);  
    this.dataService.configure(this.rout);
    this.loadAll();
  }

  loadAll() {
    this.dataService.getAll().subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
  }

  editAcademicSubject(p: AcademicSubject) {
    this.academicSubject = p;
  }

  updateAcademicSubject(id: number, p: AcademicSubject) {
    this.dataService.update(id, p).subscribe(data => this.loadAll());
    this.cancel();
  }

  deleteAcademicSubject(p: number) {
    this.dataService.delete(p).subscribe(data => this.loadAll());
  }

  createAcademicSubject(p: AcademicSubject) {
    this.dataService.create(p).subscribe((data: AcademicSubject) => this.academicSubjects.push(data));
    this.cancel();
  }

  cancel() {
    this.academicSubject = new AcademicSubject();
    this.loadAll();
  }
} 

