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
  class: Class = new Class();
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
    this.class = {...p};  
  }

  deleteClassTeacher(){
    this.class.classTeacherId = null;
    this.class.classTeacherFullName = null;
  }

  updateClass() {
    this.dataService.update(this.classes_route, this.class.id, this.class).subscribe(() => {
      if (this.class.classTeacherId != null){
        this.class.classTeacherFullName = this.teacherFullNames.find(x => x.id == this.class.classTeacherId).fullName;
      }
      Object.assign(this.buf, this.class);    
      this.cancel();
    });
  }

  cancel() {
    this.class = new Class();
  }
}
