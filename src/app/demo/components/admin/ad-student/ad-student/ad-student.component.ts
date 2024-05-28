import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/demo/api/student';
import { StudentService } from 'src/app/demo/service/student.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ad-student',
  templateUrl: './ad-student.component.html',
  styleUrls: ['./ad-student.component.scss'],
  providers: [MessageService, StudentService],
})
export class AdStudentComponent implements OnInit {
  students: Student[] = [];
  student: Student | null = null;
  studentDialog: boolean = false;
  deleteStudentDialog: boolean = false;
  deleteStudentsDialog: boolean = false;
  selectedStudents: Student[] = [];
  submitted: boolean = false;

  cols: any[] = [];

  constructor(private studentService: StudentService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadStudents();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'lastname', header: 'Lastname' },
      { field: 'email', header: 'Email' }
    ];
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  openNew() {
    this.student = {
      _id: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      abonnements: [],
      formation: []
    };
    this.submitted = false;
    this.studentDialog = true;
  }

  deleteSelectedStudents() {
    this.deleteStudentsDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteStudentsDialog = false;
    const selectedIds = this.selectedStudents.map(student => student._id);
    this.studentService.deleteStudents(selectedIds).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Students Deleted', life: 3000 });
        this.loadStudents();
        this.selectedStudents = [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editStudent(student: Student) {
    this.student = { ...student };
    this.studentDialog = true;
  }

  deleteStudent(student: Student) {
    this.student = { ...student };
    this.deleteStudentDialog = true;
  }

  confirmDelete() {
    this.deleteStudentDialog = false;
    this.studentService.deleteStudent(this.student._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Deleted', life: 3000 });
        this.loadStudents();
        this.student = null;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }

  saveStudent() {
    this.submitted = true;
    if (this.student.name?.trim() && this.student.lastname?.trim() && this.student.email?.trim() && this.student.password?.trim()) {
      if (this.student._id) {
        this.studentService.updateStudent(this.student).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Updated', life: 3000 });
            this.loadStudents();
            this.studentDialog = false;
            this.student = null;
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      } else {
        this.studentService.createStudent(this.student).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Created', life: 3000 });
            this.loadStudents();
            this.studentDialog = false;
            this.student = null;
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
