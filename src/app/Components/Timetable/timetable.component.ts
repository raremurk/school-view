import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../../data.service';
import { TimetableDay} from '../../Models/timetableDay'; 
import { AcademicSubject } from '../../Models/academicSubject';
import { Class } from '../../Models/class';
import { switchMap } from 'rxjs/operators';
     
@Component({
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  providers: [DataService]
})
export class TimetableComponent implements OnInit{ 

  headers: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  times: string[] = ['09:00-09:45', '09:55-10:40', '11:00-11:45', '12:05-12:50', '13:00-13:45'
    , '13:55-14:40', '14:50-15:35'];
  title = 'Расписание';
  rout_main = 'http://localhost:49716/api/lessons';
  rout_as = 'http://localhost:49716/api/academicsubjects/class';
  rout_cl = 'http://localhost:49716/api/classes';
  classes: Class[];
  academicSubjects: AcademicSubject[];
  timetable: [TimetableDay[]] = [[new TimetableDay()]];
  timetableDay: TimetableDay[] = [new TimetableDay()]; 
  id: number;

  constructor(private titleService: Title, private dataService: DataService, 
    private activateRoute: ActivatedRoute){}

    ngOnInit(){ 
    this.titleService.setTitle(this.title);
    this.loadAllClasses();
    this.activateRoute.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe((data)=> {
        this.id = +data;        
        this.loadAllAcademicSubjects(this.id);
        this.loadTimetable(this.id);
        this.cancel(); 
      });
  }

  loadAllClasses() {
    this.dataService.configure(this.rout_cl);
    this.dataService.getAll().subscribe((data: Class[]) => this.classes = data); 
  }

  loadAllAcademicSubjects(id: number) {
    this.dataService.configure(this.rout_as);
    this.dataService.getOne(id).subscribe((data: AcademicSubject[]) => this.academicSubjects = data);
  }

  loadTimetable(id: number) {    
    this.dataService.configure(this.rout_main);
    this.dataService.getOne(id).subscribe((data: [TimetableDay[]]) => this.timetable = data); 
  }

  editTimetableDay(p: TimetableDay[]) {
    this.timetableDay = p;
  }

  updateTimetableDay(p: TimetableDay[]) {
    for (let one of p){
      this.dataService.update(one.id, one).subscribe(data => this.loadTimetable(one.classId));
    }    
    this.cancel();
  }

  cancel() {
    this.timetableDay = [new TimetableDay()];
  }
} 

