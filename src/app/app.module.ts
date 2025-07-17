import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { DocumentListComponent } from './document-list/document-list.component';

import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { StudentService } from './services/student.service';
import { DocumentService } from './services/document.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  // No declarations for standalone components
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule // Required for router-outlet
  ],
  providers: [
    AuthService,
    ProjectService,
    StudentService,
    DocumentService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
  ],
})
export class AppModule { }
