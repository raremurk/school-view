import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {StudentsDialogComponent} from './Dialog/studentsDialog.component';
import {Student} from '../../Models/student';
import {Class} from '../../Models/class';
import {DataService} from '../../data.service';

@Component({
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [DataService]
})
export class StudentsComponent implements OnInit{ 
  title = 'Список учеников';
  students_route = 'students';
  classes_route = 'classes';
  minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 20));    
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 4));
  classes: Class[] = [];
  
  student: Student = new Student(0, '', '', '', '', '', 1);
  editableStudent: Student= new Student(0, '', '', '', '', '', 1); 

  displayedFilterColumns: string[] = ['lastNameFilter', 'firstNameFilter', 'middleNameFilter', 'birthdayFilter', 
  'genderFilter', 'classIdFilter'];
  displayedColumns: string[] = ['lastName', 'firstName', 'middleName', 'birthday', 'gender', 'classId', 'operations'];

  
  lastNameFilter = { label: 'Фильтр по фамилии', value: '' , columnDef: 'lastNameFilter'};
  firstNameFilter = { label: 'Фильтр по имени', value: '', columnDef: 'firstNameFilter' };
  middleNameFilter = { label: 'Фильтр по отчеству', value: '' , columnDef: 'middleNameFilter'};
  birthdayFilter = { label: 'Фильтр по дате рождения', value: '', columnDef: 'birthdayFilter' };
  genderFilter: string = '';
  classIdFilter: string = '';
  filters = [this.lastNameFilter, this.firstNameFilter, this.middleNameFilter, this.birthdayFilter];

  dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator= <MatPaginator>{};

  constructor(public dialog: MatDialog, private titleService: Title, private dataService: DataService){ }
    
  ngOnInit(){  
    this.titleService.setTitle(this.title); 
    this.loadAllClasses();   
    this.loadAllStudents(); 
    if(history.state.classId){
      this.classIdFilter = history.state.classId;
    }    
  }
 
  openDialog() {
    this.dialog.open(StudentsDialogComponent, { autoFocus: 'dialog'}).afterClosed().subscribe((result: Student) => {
      if(result.id == 0) {
        this.dataService.create(this.students_route, result)
          .subscribe({next:(createdStudent: any) => this.dataSource.data = [...this.dataSource.data, createdStudent]});
      }
    });
  }

  loadAllClasses() {
    this.dataService.getAll(this.classes_route).subscribe({next:(data: any) => this.classes = data});    
  }

  loadAllStudents() {
    this.dataService.getAll(this.students_route).subscribe({next:(data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.initializeTableDataSource();  
      this.applyFilter();    
    }});    
  }

  editStudent(stud: Student) {
    this.student = stud;
    this.editableStudent = { ...stud};    
  }

  updateStudent() {
    this.dataService.update(this.students_route, this.editableStudent.id, this.editableStudent).subscribe(() => {
      Object.assign(this.student, this.editableStudent); 
      this.cancel();
    });
  }

  deleteStudent(p: number) {
    this.dataService.delete(this.students_route, p).subscribe(() => {
      var index = this.dataSource.data.findIndex(x => x.id == p);
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  cancel() {
    this.editableStudent.id = 0;
  }

  applyFilter() {
    this.dataSource.filter = [
      this.lastNameFilter.value.trim().toUpperCase(), 
      this.firstNameFilter.value.trim().toUpperCase(),  
      this.middleNameFilter.value.trim().toUpperCase(), 
      this.birthdayFilter.value.trim(), 
      this.genderFilter,  
      this.classIdFilter
    ].join('$q$');
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  toggleChange(event: any) {
    const toggle = event.source;
    if (toggle && event.value.some((item: any) => item == toggle.value)) {
        toggle.buttonToggleGroup.value = [toggle.value];
    }
    this.genderFilter = this.genderFilter.includes(toggle.value) ? '' : toggle.value;
    this.applyFilter();
  }

  clear(filter: { label: string, value : string }) {
    filter.value = '';
    this.applyFilter();
  }

  clearClassId(event: any) {
    history.replaceState({}, '/students');
    this.classIdFilter = '';
    event.stopPropagation();
    this.applyFilter();
  }

  initializeTableDataSource() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: Student, filter: string): boolean => {
      let filters: string[] = filter.split('$q$');
      return data.lastName.toUpperCase().includes(filters[0])
        && data.firstName.toUpperCase().includes(filters[1])
        && data.middleName.toUpperCase().includes(filters[2])
        && data.birthday.includes(filters[3])
        && (filters[4] == '' || data.gender == filters[4])
        && (filters[5] == '' || data.classId == Number(filters[5]));
    };
  }
} 
