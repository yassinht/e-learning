import { Component, OnInit } from '@angular/core';
import { Quiz, Question, Option } from 'src/app/demo/api/quizModel'; // Adjust the import path as per your project structure
import { QuizService } from 'src/app/demo/service/quiz.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-quizzes',
  templateUrl: './teacher-quizzes.component.html',
  styleUrls: ['./teacher-quizzes.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TeacherQuizzesComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;
  error: string | null = null;
  quizDialog: boolean = false;

  cols: any[] = [];

  constructor(
    private quizService: QuizService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const teacherId = '664b93e454c0f9fac0318c93'; // Replace with actual teacher ID
    this.loadQuizzes(teacherId);

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'questions', header: 'Questions' }, // Adjust as per your data structure
      { field: '', header: '' }
    ];
  }

  onSelectQuiz(quiz: Quiz) {
    this.quizService.getQuestionsByQuizId(quiz._id).subscribe(
      (questions: Question[]) => {
        this.selectedQuiz = { ...quiz, questions }; // Assign fetched quiz with questions to selectedQuiz
        this.quizDialog = true; // Show the quiz dialog
      },
      (error) => {
        console.error('Error fetching quiz questions:', error);
        this.error = 'Error fetching quiz questions. Please try again later.';
      }
    );
  }

  hideDialog() {
    this.quizDialog = false; // Hide the quiz dialog
    this.selectedQuiz = null; // Reset selectedQuiz
  }

  loadQuizzes(teacherId: string) {
    this.quizService.getQuizzesByTeacherId(teacherId).subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
        this.error = 'Error fetching quizzes. Please try again later.';
      }
    );
  }

  deleteQuiz(quiz: Quiz) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + quiz.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Logic to delete quiz
      }
    });
  }
}
