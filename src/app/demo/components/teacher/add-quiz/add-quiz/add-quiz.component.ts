import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { QuizService } from 'src/app/demo/service/quiz.service';
import { FormationService } from 'src/app/demo/service/formation.service';
import { Quiz, Question, Option } from 'src/app/demo/api/quizModel';
import { Formation } from 'src/app/demo/api/formation';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
  providers: [MessageService]
})
export class AddQuizComponent implements OnInit {
  quizForm: FormGroup;
  questionDialog: boolean = false;
  submitted: boolean = false;
  formations: Formation[] = [];
  idTeacher: string;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private formationService: FormationService,
    private messageService: MessageService
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      formations: this.fb.array([]),
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.idTeacher = localStorage.getItem('id_teacher');
    this.loadFormations();
  }

  loadFormations() {
    this.formationService.getFormationsByTeacher(this.idTeacher).subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.formations = data;
          this.initializeFormationsFormArray();
        } else {
          console.error('Invalid formation data:', data);
        }
      },
      (error) => {
        console.error('Error fetching formations:', error);
      }
    );
  }

  initializeFormationsFormArray() {
    const formationsFormArray = this.quizForm.get('formations') as FormArray;
    formationsFormArray.clear();
    this.formations.forEach(formation => {
      formationsFormArray.push(this.fb.control(formation._id, Validators.required));
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  get title() {
    return this.quizForm.get('title');
  }

  get description() {
    return this.quizForm.get('description');
  }

  addQuestion() {
    this.questions.push(this.newQuestion());
    this.questionDialog = true;
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index);
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      content: ['', Validators.required],
      options: this.fb.array([
        this.newOption(),
        this.newOption(),
        this.newOption(),
        this.newOption()
      ])
    });
  }

  newOption(): FormGroup {
    return this.fb.group({
      content: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addQuiz() {
    this.submitted = true;
    if (this.quizForm.invalid) {
      console.log('Form is invalid:', this.quizForm.value);
      return;
    }

    const quizData = {
      title: this.quizForm.value.title,
      description: this.quizForm.value.description,
      formations: this.quizForm.value.formations,
      createdBy: this.idTeacher
    };

    this.quizService.addQuiz(quizData).subscribe(
      (quiz) => {
        const quizId = quiz._id; // Assuming the response contains the created quiz with an _id field
        this.addQuestionsToQuiz(quizId);
      },
      (error) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Quiz Creation Failed',
          life: 3000
        });
      }
    );
  }

  addQuestionsToQuiz(quizId: string) {
    const questions = this.quizForm.value.questions;
    const addQuestionPromises = questions.map((question: Question) => {
      return this.quizService.addQuestionToQuiz(quizId, question).toPromise();
    });

    Promise.all(addQuestionPromises).then(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Quiz Created',
          life: 3000
        });
        this.quizForm.reset();
        this.submitted = false;
      },
      (error) => {
        console.error('Error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add some questions',
          life: 3000
        });
      }
    );
  }

  hideDialog() {
    this.questionDialog = false;
    this.submitted = false;
  }
}
