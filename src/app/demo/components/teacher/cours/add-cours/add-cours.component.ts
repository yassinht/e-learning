import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Cours } from 'src/app/demo/api/cours';
import { Formation } from 'src/app/demo/api/formation';
import { CoursService } from 'src/app/demo/service/cours.service';
import { FormationService } from 'src/app/demo/service/formation.service';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.scss'],
  providers: [MessageService], // Remove CoursService from providers
})
export class AddCoursComponent implements OnInit {
  // Component properties
  courses: Cours[] = [];
  course: Cours | null = null;
  courseDialog: boolean = false;
  deleteCourseDialog: boolean = false;
  deleteCoursesDialog: boolean = false;
  selectedCourses: Cours[] = [];
  submitted: boolean = false;
  idTeacher: any;
  formations: Formation[] = [];

  // Columns for p-table
  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'description', header: 'Description' },
    { field: 'formation', header: 'Formation' },
    { field: 'video', header: 'Video' },
    
  ];

  constructor(
    private coursService: CoursService,
    private formationService: FormationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.idTeacher = localStorage.getItem('id_teacher');
    this.loadCourses();
    this.loadFormations();
  }

  loadCourses() {
    this.coursService.getMyCourses(this.idTeacher).subscribe((data) => {
      console.log(data)
      this.courses = data;
    });
  }

  loadFormations() {
    this.formationService.getFormationsByTeacher(this.idTeacher).subscribe((data) => {
      this.formations = data;
    });
  }

  openNew() {
    this.course = {
      title: '',
      description: '',
      formation: '',
      teacher: this.idTeacher,
    };
    this.submitted = false;
    this.courseDialog = true;
  }

  deleteSelectedCourses() {
    if (this.selectedCourses.length === 1) {
      this.deleteCourse(this.selectedCourses[0]);
    } else {
      this.deleteCoursesDialog = true;
    }
  }

  confirmDeleteSelected() {
    this.deleteCoursesDialog = false;
    const selectedIds = this.selectedCourses.map((course) => course._id);
    this.coursService.deleteCourses(selectedIds).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Courses Deleted',
          life: 3000,
        });
        this.loadCourses();
        this.selectedCourses = [];
      },
      (error) => {
        console.error(error);
        // Handle error, display an error message, etc.
      }
    );
  }

  editCourse(course: Cours) {
    this.course = { ...course };
    this.courseDialog = true;
  }

  deleteCourse(course: Cours) {
    this.deleteCourseDialog = true;
    this.course = { ...course };
  }

  confirmDelete() {
    this.deleteCourseDialog = false;
    this.coursService.deleteCourse(this.course._id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Course Deleted',
        life: 3000,
      });
      this.loadCourses();
      this.course = null;
    });
  }

  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }

  saveCourse() {
    this.submitted = true;
    
    // Check if title and description are filled
    if (this.course.title?.trim() && this.course.description?.trim()) {
      this.coursService.addCourse(this.course).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Course Created',
            life: 3000,
          });
          this.loadCourses(); // Reload courses after creation
          this.courseDialog = false; // Close the dialog
          this.course = null; // Clear the current course
        },
        (error) => {
          console.error('Error:', error);
          // Handle error, display an error message, etc.
        }
      );
    }
  }

  onGlobalFilter(event: any) {
    // Implement global filtering logic here
  }

  handleVideoChange(event: any) {
    // Implement video handling logic if needed
  }
}
