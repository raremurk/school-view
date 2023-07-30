import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS}   from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import {AppComponent}   from './Components/App/app.component';
import {AcademicSubjectsComponent}   from './Components/AcademicSubjects/academicSubjects.component';
import {AcademicSubjectsDialogComponent} from './Components/AcademicSubjects/Dialog/academicSubjectsDialog.component';
import {TeachersComponent}   from './Components/Teachers/teachers.component';
import {TeachersDialogComponent}   from './Components/Teachers/Dialog/teachersDialog.component';
import {StudentsComponent}   from './Components/Students/students.component';
import {StudentsDialogComponent} from './Components/Students/Dialog/studentsDialog.component';
import {ClassComponent}   from './Components/Classes/class.component';
import {TimetableComponent}   from './Components/Timetable/timetable.component';
import {NotFoundComponent}   from './Components/Not-found/not-found.component';
import {HomeComponent}   from './Components/Home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {SnackbarInterceptor} from './snackbar.interceptor';
import {getRussianPaginatorIntl} from './paginator.internationalization';

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
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatSelectModule,
        MatRadioModule,
        MatGridListModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatBadgeModule,
        MatCardModule
    ],
    declarations: [
        AppComponent,
        TimetableComponent,
        ClassComponent,
        TeachersComponent,
        TeachersDialogComponent, 
        StudentsComponent,
        StudentsDialogComponent,
        AcademicSubjectsComponent,    
        AcademicSubjectsDialogComponent,    
        NotFoundComponent,
        HomeComponent
    ],
    providers:    [ 
        {provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true},
        {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {subscriptSizing: 'dynamic'}},
        {provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl()},
        Title 
    ],
    bootstrap:    [ AppComponent ]
  })
export class AppModule { }
