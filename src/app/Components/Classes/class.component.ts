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

  loadAllTeachers(p: number) {
    this.dataService.getOne(this.teachersRoute, p).subscribe({next:(data: any) => this.teacherFullNames = data});
  }

  editClass(editClass: Class) {
    this.loadAllTeachers(editClass.id);
    this.class = editClass;
    this.editableClass = {...editClass};  
  }

  deleteClassTeacher(){
    this.editableClass.classTeacherId = null;
    this.editableClass.classTeacherFullName = '';
  }

  updateClass() {
    this.dataService.update(this.classesRoute, this.editableClass.id, this.editableClass).subscribe(() => {
      let teacher = this.teacherFullNames.find(x => x.id == this.editableClass.classTeacherId);
      if(teacher != undefined && this.editableClass.classTeacherId != null){
        this.editableClass.classTeacherFullName = teacher.fullName;
      }
      Object.assign(this.class, this.editableClass);    
      this.cancel();
    });
  }

  cancel() {
    this.editableClass = new Class(0, 0, '');
  }
}
