import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent}   from './Components/Home/home.component';
import {TimetableComponent}   from './Components/Timetable/timetable.component';
import {ClassComponent}   from './Components/Classes/class.component';
import {TeachersComponent}   from './Components/Teachers/teachers.component';
import {StudentsComponent}   from './Components/Students/students.component';
import {AcademicSubjectsComponent}   from './Components/AcademicSubjects/academicSubjects.component';
import {NotFoundComponent}   from './Components/Not-found/not-found.component';

const routes: Routes =[
    { path: 'timetable', redirectTo: 'timetable/5', pathMatch:'full'},
    { path: '', redirectTo: 'classes', pathMatch:'full'},
    { path: 'home', component: HomeComponent},
    { path: 'timetable/:id', component: TimetableComponent},
    { path: 'classes', component: ClassComponent},    
    { path: 'teachers', component: TeachersComponent},
    { path: 'academicsubjects', component: AcademicSubjectsComponent},
    { path: 'students', component: StudentsComponent}, 
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
