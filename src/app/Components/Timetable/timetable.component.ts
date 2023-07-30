import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../../data.service';
import { Lesson} from '../../Models/lesson'; 
import { AcademicSubject } from '../../Models/academicSubject';
import { Class } from '../../Models/class';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  providers: [DataService]
})
export class TimetableComponent implements OnInit{ 
  title = 'Расписание';
  headers: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  classes_route = 'classes';
  lessons_route = 'lessons';
  subjects_route = 'academicsubjects/class';  
  academicSubjects: AcademicSubject[];
  classes: Class[];
  buf: Lesson[];
  timetable: [Lesson[]];
  timetableDay: Lesson[]; 
  id: number;
  edit_day: number = 0;

  constructor(private titleService: Title, private dataService: DataService, private activateRoute: ActivatedRoute){ }

  ngOnInit(){ 
    this.titleService.setTitle(this.title);
    this.loadAllClasses();
    this.activateRoute.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe((data)=> {
        this.id = +data;  
        if(this.id > 0 && this.id <= 11) {
          this.loadAllAcademicSubjects(this.id);
          this.loadTimetable(this.id);
        }     
      });
  }

  loadAllClasses() {
    this.dataService.getAll(this.classes_route).subscribe((data: Class[]) => this.classes = data);
  }

  loadAllAcademicSubjects(id: number) {
    this.dataService.getOne(this.subjects_route, id).subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
  }

  loadTimetable(id: number) {    
    this.dataService.getOne(this.lessons_route, id).subscribe((data: [Lesson[]]) => this.timetable = data); 
  }

  editTimetableDay(p: Lesson[]) {
    this.buf = p;
    this.timetableDay = JSON.parse(JSON.stringify(p))   
    this.edit_day = p[0].day;
  }

  updateTimetableDay() {
    for(let one of this.timetableDay){
      this.dataService.update(this.lessons_route, one.id, one).subscribe();
      if(one.academicSubjectId != null && one.academicSubjectId != 0){
        one.academicSubjectName = this.academicSubjects.find(x => x.id == one.academicSubjectId).name;
      }
    }  
    Object.assign(this.buf, this.timetableDay);  
    this.cancel();
  }

  deleteLesson(p: Lesson) {
    p.academicSubjectId = null;
    p.academicSubjectName = null;
  }

  cancel() {
    this.timetableDay = new Array;
    this.edit_day = 0;
  }
} 
