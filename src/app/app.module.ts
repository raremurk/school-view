import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpClientModule}   from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';

import {AppComponent}   from './Components/App/app.component';
import {AcademicSubjectsComponent}   from './Components/AcademicSubjects/academicSubjects.component';
import {AcademicSubjectsDialogComponent} from './Components/AcademicSubjects/Dialog/academicSubjectsDialog.component';
import {TeachersComponent}   from './Components/Teachers/teachers.component';
import {StudentsComponent}   from './Components/Students/students.component';
import {ClassComponent}   from './Components/Classes/class.component';
import {TimetableComponent}   from './Components/Timetable/timetable.component';
import {NotFoundComponent}   from './Components/Not-found/not-found.component';
import {HomeComponent}   from './Components/Home/home.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule, 
        FormsModule, 
        HttpClientModule,
        AppRoutingModule,
        MatSliderModule,
        MatDialogModule,
        MatButtonModule,        
        MatInputModule,
        MatIconModule,
        MatTabsModule,
        MatChipsModule
    ],
    declarations: [
        AppComponent,
        TimetableComponent,
        ClassComponent,
        TeachersComponent, 
        StudentsComponent,
        AcademicSubjectsComponent,    
        AcademicSubjectsDialogComponent,    
        NotFoundComponent,
        HomeComponent
    ],
    providers:    [ Title ],
    bootstrap:    [ AppComponent ]
  })
export class AppModule { }
