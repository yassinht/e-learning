import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/demo/api/teacher'; // Assuming you have a Teacher model similar to Student
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ad-teacher',
  templateUrl: './ad-teacher.component.html',
  styleUrls: ['./ad-teacher.component.scss'],
  providers: [MessageService, TeacherService],

})
export class AdTeacherComponent {

  teachers: Teacher[] = [];
  teacher: Teacher | null = null;
  teacherDialog: boolean = false;
  deleteTeacherDialog: boolean = false;
  deleteTeachersDialog: boolean = false;
  selectedTeachers: Teacher[] = [];
  submitted: boolean = false;

  cols: any[] = [];

  constructor(private teacherService: TeacherService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadTeachers();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'lastname', header: 'Lastname' },
      { field: 'email', header: 'Email' }
    ];
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  openNew() {
    this.teacher = {
      _id: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      specialization: ''
    };
    this.submitted = false;
    this.teacherDialog = true;
  }

  deleteSelectedTeachers() {
    this.deleteTeachersDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteTeachersDialog = false;
    const selectedIds = this.selectedTeachers.map(teacher => teacher._id);
    this.teacherService.deleteTeachers(selectedIds).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Teachers Deleted', life: 3000 });
        this.loadTeachers();
        this.selectedTeachers = [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editTeacher(teacher: Teacher) {
    this.teacher = { ...teacher };
    this.teacherDialog = true;
  }

  deleteTeacher(teacher: Teacher) {
    this.teacher = { ...teacher };
    this.deleteTeacherDialog = true;
  }

  confirmDelete() {
    this.deleteTeacherDialog = false;
    this.teacherService.deleteTeacher(this.teacher._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Teacher Deleted', life: 3000 });
        this.loadTeachers();
        this.teacher = null;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  hideDialog() {
    this.teacherDialog = false;
    this.submitted = false;
  }

  saveTeacher() {
    this.submitted = true;
    if (this.teacher.name?.trim() && this.teacher.lastname?.trim() && this.teacher.email?.trim() && this.teacher.password?.trim()) {
      if (this.teacher._id) {
        this.teacherService.updateTeacher(this.teacher).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Teacher Updated', life: 3000 });
            this.loadTeachers();
            this.teacherDialog = false;
            this.teacher = null;
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      } else {
        this.teacherService.createTeacher(this.teacher).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Teacher Created', life: 3000 });
            this.loadTeachers();
            this.teacherDialog = false;
            this.teacher = null;
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    }
  }

  onGlobalFilter(event: any) {
    // Implement global filtering logic here
  }
}
