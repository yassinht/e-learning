import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/demo/service/cours.service';
import { FormationService } from 'src/app/demo/service/formation.service';
import { StudentService } from 'src/app/demo/service/student.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})
export class FormationDetailsComponent implements OnInit {
  formation: any;
  courses: any[];
  studentId: string = localStorage.getItem('id_student'); // Get student ID from localStorage
  progress: any[] = [];
  formationProgress: number = 0;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private formationService: FormationService, private coursService: CoursService) { }

  ngOnInit(): void {
    const formationId = this.route.snapshot.paramMap.get('id');
    this.formationService.getFormationById(formationId).subscribe((data: any) => {
      this.formation = data;
      this.loadProgress(formationId);
    });

    this.getAllCoursesByFormation(formationId);
  }

  getAllCoursesByFormation(formationId: string) {
    this.coursService.getAllCoursesByFormation(formationId).subscribe(
      (data: any) => {
        this.courses = data; // Assign fetched courses to local array
        console.log('Courses:', this.courses); // Log courses to verify data
        this.calculateFormationProgress(); // Calculate formation progress
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  loadProgress(formationId: string): void {
    this.studentService.getProgress(this.studentId, formationId).subscribe((data: any) => {
      this.progress = data;
      this.calculateFormationProgress(); // Recalculate formation progress
    });
  }

  updateProgress(courseId: string, progress: number): void {
    const course = this.courses.find(course => course._id === courseId);
    const completed = progress === 100;
    this.studentService.updateProgress(this.studentId, this.formation._id, courseId, progress, completed).subscribe(() => {
      this.loadProgress(this.formation._id); // Reload progress
    });
  }

  markCourseCompleted(courseId: string): void {
    const course = this.courses.find(course => course._id === courseId);
    course.completed = true; // Mark the course as completed locally
    this.updateProgress(courseId, 100); // Update progress to 100%
  }

  calculateFormationProgress(): void {
    if (this.progress.length === 0) return;
    const totalCourses = this.progress.length;
    const completedCourses = this.progress.filter(course => course.completed).length;
    this.formationProgress = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
  }
}
