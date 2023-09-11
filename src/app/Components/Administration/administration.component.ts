import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {DataService} from '../../data.service';
import {Administration} from 'src/app/Models/administration';
import {TeacherFullName} from 'src/app/Models/teacherFullName';
import {SchoolStat} from 'src/app/Models/schoolStat';

@Component({
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  providers: [DataService]
})
export class AdministrationComponent {
  title = 'Администрирование';  
  administrationRoute = 'administration';
  teachersRoute = 'teachers/position';
  schoolStat = new SchoolStat(0, 0);
  teacherFullNames: TeacherFullName[] = [];
  administration: Administration[] = [];
  personToUpdate = new Administration('', 0, '');
  editablePerson = new Administration('', 0, '');
  
  constructor(private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);      
    this.loadInfo();
    this.loadAdministration();  
  }

  loadInfo(){
    this.dataService.getOne(this.administrationRoute, 'schoolStat').subscribe({next:(data: any) => this.schoolStat = data});
  } 

  loadAdministration(){
    this.dataService.getAll(this.administrationRoute).subscribe({next:(data: any) => this.administration = data});
  }

  editAdministration(editPerson: Administration){ 
    this.dataService.getOne(this.teachersRoute, editPerson.position).subscribe({next:(data: any) => {
      this.teacherFullNames = data;
      this.personToUpdate = editPerson;
      this.editablePerson = {...editPerson};
    }});
  }

  updateAdministration(){
    let teacher = this.teacherFullNames.find(x => x.id == this.editablePerson.teacherId);
    this.editablePerson.fullName = teacher != undefined ? teacher.fullName : '';
    this.dataService.update(this.administrationRoute, this.editablePerson.position, this.editablePerson).subscribe(() => {
      Object.assign(this.personToUpdate, this.editablePerson);
      this.cancel();
    });
  }

  promoteStudents(){
    if(confirm()){
      this.dataService.create(this.administrationRoute +'/' + 'promoteStudents', '').subscribe();
      this.loadInfo();
    }
  }

  clearPosition(){ 
    this.editablePerson.teacherId = null;
    this.editablePerson.fullName = '';
  }

  cancel(){ 
    this.editablePerson = new Administration('', 0, '');
  }
}
