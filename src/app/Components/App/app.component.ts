import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeLink : string = '';
  homeLabel: string = 'Админка';
  homeLink: string = '/home';
  labels: string[] = ['Расписание', 'Классы', 'Учителя', 'Ученики', 'Учебные предметы'];
	links: string[] = ['/timetable/1', '/classes', '/teachers', '/students', '/academicsubjects'];	

  constructor(private router: Router) {}

  ngOnInit(){
    this.router.events.subscribe(() => {this.activeLink = this.router.url});
  }
}
