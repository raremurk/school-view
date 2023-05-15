import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  labels: string[] = ['Расписание', 'Классы', 'Учителя', 'Ученики', 'Учебные предметы'];
	links: string[] = ['/timetable', '/classes', '/teachers', '/students', '/academicsubjects'];	
}
