import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AcademicSubjectComponent }   from './Components/Academicsubject/academicSubject.component';
import { TeachersComponent }   from './Components/Teachers/teachers.component';
import { StudentsComponent }   from './Components/Students/students.component';
import { ClassComponent }   from './Components/Classes/class.component';
import { TimetableComponent }   from './Components/Timetable/timetable.component';
import { NavbarComponent }   from './Components/Navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent }   from './Components/Not-found/not-found.component';
import { HomeComponent }   from './Components/Home/home.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'academicsubjects', component: AcademicSubjectComponent},
    { path: 'teachers', component: TeachersComponent},
    { path: 'students', component: StudentsComponent},
    { path: 'classes', component: ClassComponent},
    { path: 'timetable/:id', component: TimetableComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:      [ 
        BrowserModule, 
        FormsModule, 
        HttpClientModule, 
        MatMomentDateModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        RouterModule.forRoot(appRoutes) ],
    declarations: [ 
        NavbarComponent, 
        AcademicSubjectComponent, 
        TeachersComponent, 
        StudentsComponent,
        ClassComponent,
        TimetableComponent,
        HomeComponent, 
        NotFoundComponent ],
    providers:    [ Title ],
    bootstrap:    [ NavbarComponent ]
})
export class AppModule { }
