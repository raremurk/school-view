import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';
import { DataService } from '../../data.service';
import { AcademicSubject } from '../../Models/academicSubject';

@Component({
  templateUrl: './academicSubject.component.html',
  styleUrls: ['./academicSubject.component.scss'],
  providers: [DataService]
})
export class AcademicSubjectComponent implements OnInit{ 
  title = 'Список предметов';     
  rout = 'http://localhost:49716/api/academicsubjects';
  buf: AcademicSubject = new AcademicSubject();
  academicSubject: AcademicSubject = new AcademicSubject();
  academicSubjects: AcademicSubject[];  
  slider_options: Options = { floor: 1, ceil: 11, showTicksValues: true};
  slider_options_disabled: Options = {...this.slider_options, disabled : true};
  
  constructor(private titleService: Title, private dataService: DataService,){      
  }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);
    this.loadAllAcademicSubjects();
  }

  loadAllAcademicSubjects() {
    this.dataService.getAll(this.rout).subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
  }

  saveAcademicSubject() {
    if (this.academicSubject.id == null) {
      this.dataService.create(this.rout, this.academicSubject)
        .subscribe((data: AcademicSubject) => this.academicSubjects.push(data));
    } 
    else {
      this.dataService.update(this.rout, this.academicSubject.id, this.academicSubject)
        .subscribe();
      Object.assign(this.buf, this.academicSubject);
    }    
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
    this.dataService.delete(this.rout, p).subscribe(data => {
      var index = this.academicSubjects.findIndex(x => x.id == p);
      this.academicSubjects.splice(index, 1);
    });
  }

  cancel() {    
    this.academicSubject = new AcademicSubject();
  }
} 
