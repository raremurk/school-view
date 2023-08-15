import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router'
import {DataService} from '../../data.service';
import {Lesson} from '../../Models/lesson'; 
import {AcademicSubject} from '../../Models/academicSubject';
import {Class} from '../../Models/class';
import {switchMap} from 'rxjs/operators';

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
  classes: Class[] = [];
  timetable: [Lesson[]] = [[]];
  academicSubjects: AcademicSubject[] = [];
  timetableDay: Lesson[] = []; 
  editableTimetableDay: Lesson[] = [];
  editableDayIndex: number = 0;
  id: number = 0;  

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
    this.dataService.getAll(this.classes_route).subscribe({next:(data: any) => this.classes = data});
  }

  loadAllAcademicSubjects(id: number) {
    this.dataService.getOne(this.subjects_route, id).subscribe({next:(data: any) => this.academicSubjects = data});
  }

  loadTimetable(id: number) {    
    this.dataService.getOne(this.lessons_route, id).subscribe({next:(data: any) => this.timetable = data}); 
  }

  editTimetableDay(day: Lesson[]) {
    this.timetableDay = day;
    this.editableTimetableDay = JSON.parse(JSON.stringify(day))   
    this.editableDayIndex = day[0].day;
  }

  updateTimetableDay() {
    this.editableTimetableDay.forEach((lesson, index) => {
      if(lesson.academicSubjectId != this.timetableDay[index].academicSubjectId){
        let subject = this.academicSubjects.find(x => x.id == lesson.academicSubjectId);
        if(subject != undefined){
          lesson.academicSubjectName = subject.name;
        }
        this.dataService.update(this.lessons_route, lesson.id, lesson).subscribe();
      }
    });
    Object.assign(this.editableTimetableDay, this.timetableDay);  
    this.cancel();
  }

  deleteLesson(lesson: Lesson) {
    lesson.academicSubjectId = null;
    lesson.academicSubjectName = '';
  }

  cancel() {
    this.timetableDay = new Array;
    this.editableDayIndex = 0;
  }
} 
