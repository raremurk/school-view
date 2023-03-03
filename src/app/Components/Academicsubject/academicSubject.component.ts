import { Component, OnInit } from '@angular/core';
import { AcademicSubject } from '../../Models/academicSubject';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../data.service';
     
@Component({
    selector: 'app',
    templateUrl: './academicSubject.component.html',
    styleUrls: ['./academicSubject.component.scss'],
    providers: [DataService]
})
export class AcademicSubjectComponent implements OnInit{ 
    title = 'Список предметов';
    academicSubjects: AcademicSubject[];
    academicSubject: AcademicSubject = new AcademicSubject();
    
    constructor(private titleService: Title, private dataService: DataService){}
      
    ngOnInit(){
      this.titleService.setTitle(this.title);  
      this.loadAll();
    }

    loadAll() {
      this.dataService.getAll().subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
    }

    editAcademicSubject(p: AcademicSubject) {
      this.academicSubject = p;
    }

    updateAcademicSubject(p: AcademicSubject) {
      this.dataService.update(p).subscribe(data => this.loadAll());
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

