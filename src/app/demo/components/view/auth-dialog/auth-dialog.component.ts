import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthStudentService } from 'src/app/demo/service/auth-student.service';
import { AuthTeacherService } from 'src/app/demo/service/auth-teacher.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  isLogin: boolean = true; // Default to login tab
  isTeacher: boolean = false; // Default to student role    studentLoginForm: FormGroup;
    teacherLoginForm: FormGroup;
    studentLoginForm: FormGroup;
    studentRegisterForm: FormGroup;
    teacherRegisterForm: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private authStudentService: AuthStudentService,
      private authTeacherService: AuthTeacherService) {}  
    ngOnInit(): void {
      // Initialize form groups
     
  
      this.teacherLoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
      this.studentLoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
      this.studentRegisterForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  
      this.teacherRegisterForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        specialization: ['', Validators.required]
      });
    }
  
  
    toggleTab(isLogin: boolean) {
      this.isLogin = isLogin;
    }
  
    toggleRole(isTeacher: boolean) {
      this.isTeacher = isTeacher;
    }

    studentLogin() {
      const credentials = this.studentLoginForm.value;
      this.authStudentService.studentLogin(credentials).subscribe(response => {
        // Gérer la réponse, par exemple, sauvegarder les données si la connexion réussit
      }, error => {
        // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      });
    }
  
    teacherLogin() {
      const credentials = this.teacherLoginForm.value;
      this.authTeacherService.teacherLogin(credentials).subscribe(response => {
        console.log(response)
        this.authTeacherService.saveDataTeacher(response.mytoken)
        // Gérer la réponse, par exemple, sauvegarder les données si la connexion réussit
      }, error => {
        // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      });
    }
  
    studentRegister() {
      const userData = this.studentRegisterForm.value;
      this.authStudentService.studentRegister(userData).subscribe(response => {
        // Gérer la réponse, par exemple, rediriger l'utilisateur vers une page de connexion
      }, error => {
        // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      });
    }
  
    teacherRegister() {
      const userData = this.teacherRegisterForm.value;
      console.log(userData)
      this.authTeacherService.teacherRegister(userData).subscribe(response => {
        console.log(response)
        // Gérer la réponse, par exemple, rediriger l'utilisateur vers une page de connexion
      }, error => {
        // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      });
    }
  }

