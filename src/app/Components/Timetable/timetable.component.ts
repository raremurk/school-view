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
  classesRoute = 'classes';
  lessonsRoute = 'lessons';
  subjectsRoute = 'academicsubjects/class';  
  classes: Class[] = [];
  timetable: [Lesson[]] = [[]];
  academicSubjects: AcademicSubject[] = [];
  editableDay: Lesson[] = [];
  editableDayIndex: number = 0;
  classId: number = 0;  

  constructor(private titleService: Title, private dataService: DataService, private activateRoute: ActivatedRoute){ }

  ngOnInit(){ 
    this.titleService.setTitle(this.title);
    this.loadAllClasses();
    this.activateRoute.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe((data)=> {
        this.classId = +data;  
        if(this.classExists()) {
          this.loadAllAcademicSubjects(this.classId);
          this.loadTimetable(this.classId);
          this.cancel();
        }     
      });
  }

  classExists() {
    return this.classId >= 1 && this.classId <= 11;
  }

  days() {
    return this.classId >= 1 && this.classId <= 4 ? this.headers.slice(0, -1) : this.headers;
  }

  loadAllClasses() {
    this.dataService.getAll(this.classesRoute).subscribe({next:(data: any) => this.classes = data});
  }

  loadAllAcademicSubjects(id: number) {
    this.dataService.getOne(this.subjectsRoute, id).subscribe({next:(data: any) => this.academicSubjects = data});
  }

  loadTimetable(id: number) {    
    this.dataService.getOne(this.lessonsRoute, id).subscribe({next:(data: any) => this.timetable = data}); 
  }

  editTimetableDay(index: number) {
    this.editableDayIndex = index + 1;
    this.editableDay = JSON.parse(JSON.stringify(this.timetable[index]));
  }

  updateTimetableDay() {
    this.editableDay.forEach((lesson, index) => {
      if(lesson.academicSubjectId != this.timetable[this.editableDayIndex - 1][index].academicSubjectId){
        let subject = this.academicSubjects.find(x => x.id == lesson.academicSubjectId);
        lesson.academicSubjectName = subject != undefined ? subject.name : '';
        this.dataService.update(this.lessonsRoute, lesson.id, lesson).subscribe(() => {
          this.timetable[this.editableDayIndex - 1] = this.editableDay; 
          this.cancel();
        });
      }
    });   
  }

  deleteLesson(lesson: Lesson) {
    lesson.academicSubjectId = null;
    lesson.academicSubjectName = '';
  }

  cancel() {
    this.editableDay = [];
    this.editableDayIndex = 0;
  }
} 
