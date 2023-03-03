import { Component } from '@angular/core';
     
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
	labels: string[] = ['Расписание', 'Классы', 'Учителя', 'Ученики', 'Учебные предметы'];
	links: string[] = ['timetable/1', 'classes', 'teachers', 'students', 'academicsubjects'];
} 
