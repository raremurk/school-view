import { NgModule }      from '@angular/core';
import { BrowserModule, Title  } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { AcademicSubjectComponent }   from './Components/Academicsubject/academicSubject.component';
import { NavbarComponent }   from './Components/Navbar/navbar.component';


@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ AcademicSubjectComponent, NavbarComponent ],
    providers:    [Title],
    bootstrap:    [ AcademicSubjectComponent, NavbarComponent ]
})
export class AppModule { }
