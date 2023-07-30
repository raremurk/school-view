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
  classes_route = 'classes';
  teachers_route = 'teachers/class';
  buf: Class = new Class();
  editableClass: Class = new Class(0, 0, '');
  classes: Class[];    
  teacherFullNames: TeacherFullName[];
  
  constructor(private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){
    this.titleService.setTitle(this.title);   
    this.loadAllClasses();
  }

  loadAllClasses() {
    this.dataService.getAll(this.classes_route).subscribe((data: Class[]) => this.classes = data);    
  }

  loadAllTeachers(p: number) {
    this.dataService.getOne(this.teachers_route, p).subscribe((data: TeacherFullName[]) => this.teacherFullNames = data);
  }

  editClass(p: Class) {
    this.loadAllTeachers(p.id);
    this.buf = p;
    this.editableClass = {...p};  
  }

  deleteClassTeacher(){
    this.editableClass.classTeacherId = null;
    this.editableClass.classTeacherFullName = '';
  }

  updateClass() {
    this.dataService.update(this.classes_route, this.editableClass.id, this.editableClass).subscribe(() => {
      if (this.editableClass.classTeacherId != null){
        this.editableClass.classTeacherFullName = this.teacherFullNames.find(x => x.id == this.editableClass.classTeacherId).fullName;
      }
      Object.assign(this.buf, this.editableClass);    
      this.cancel();
    });
  }

  cancel() {
    this.editableClass = new Class();
  }
}
