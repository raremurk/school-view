import { NgModule } from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AppComponent }   from './Components/App/app.component';
import { AcademicSubjectComponent }   from './Components/Academicsubject/academicSubject.component';
import { TeachersComponent }   from './Components/Teachers/teachers.component';
import { StudentsComponent }   from './Components/Students/students.component';
import { ClassComponent }   from './Components/Classes/class.component';
import { TimetableComponent }   from './Components/Timetable/timetable.component';
import { NavbarComponent }   from './Components/Navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent }   from './Components/Not-found/not-found.component';
import { HomeComponent }   from './Components/Home/home.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule, 
        HttpClientModule,
        AppRoutingModule,
        NgxSliderModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent, 
        TimetableComponent,
        ClassComponent,
        TeachersComponent, 
        StudentsComponent,
        AcademicSubjectComponent,        
        NotFoundComponent,
        HomeComponent        
    ],
    providers:    [ Title ],
    bootstrap:    [ AppComponent ]
  })
export class AppModule { }
