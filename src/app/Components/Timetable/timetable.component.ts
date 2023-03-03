import { Component, OnInit } from '@angular/core';
import { Class } from '../../Models/class';
import { TeacherFullName } from '../../Models/teacherFullName';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../data.service';
     
@Component({
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  providers: [DataService]
})
export class TimetableComponent implements OnInit{ 

  days: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  times: string[] = ['09:00-09:45', '09:55-10:40', '11:00-11:45', '12:05-12:50', '13:00-13:45'
    , '13:55-14:40', '14:50-15:35'];
  title = 'Расписание';

  constructor(private titleService: Title, private dataService: DataService){}

  ngOnInit(){
    this.titleService.setTitle(this.title);  
  }
} 

