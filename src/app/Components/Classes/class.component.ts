import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Class} from '../../Models/class';
import {TeacherFullName} from '../../Models/teacherFullName';
import {DataService} from '../../data.service';
     
@Component({
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  providers: [DataService]
})
export class ClassComponent implements OnInit{ 
  title = 'Список классов';
  classesRoute = 'classes';
  teachersRoute = 'teachers/class';
  class: Class = new Class(0, 0, '');
  editableClass: Class = new Class(0, 0, '');
  classes: Class[] = [];    
  teacherFullNames: TeacherFullName[] = [];
    
  constructor(private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);   
    this.loadAllClasses();
  }

  loadAllClasses() {
    this.dataService.getAll(this.classesRoute).subscribe({next:(data: any) => this.classes = data});    
  }

  editClass(editClass: Class) {
    this.dataService.getOne(this.teachersRoute, editClass.id).subscribe({next:(data: any) => {
      this.teacherFullNames = data;
      this.class = editClass;
      this.editableClass = {...editClass};
    }});
  }

  deleteClassTeacher(){
    this.editableClass.classTeacherId = null;
    this.editableClass.classTeacherFullName = '';
  }

  updateClass() {
    let teacher = this.teacherFullNames.find(x => x.id == this.editableClass.classTeacherId);
    this.editableClass.classTeacherFullName = teacher != undefined ? teacher.shortFullName : '';
    this.dataService.update(this.classesRoute, this.editableClass.id, this.editableClass).subscribe(() => {     
      Object.assign(this.class, this.editableClass);    
      this.cancel();
    });
  }

  cancel() {
    this.editableClass = new Class(0, 0, '');
  }
}
