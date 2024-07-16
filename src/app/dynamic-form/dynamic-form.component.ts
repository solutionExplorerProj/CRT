import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionService } from './question-service';
import { Question } from '../question-module';

import { UserService } from '../user-service';
import { UserResponseDTO } from '../UserResponseDTO';


interface FormModel {
  answer: string;
}
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  form = new FormGroup({});
  model: any = { answer: '' };
  fields: FormlyFieldConfig[] = [];
  currentQuestion: any;
  userResponses: UserResponseDTO[] = [];
  previousQuestions: any[] = [];
  answerMap: { [key: string]: string } = {};
  token: string | null = null;

  constructor(private questionService: QuestionService, private userService: UserService) {}

  ngOnInit(): void {
    // Load the initial question with ID 1
    this.loadQuestions(1);
    this.token = localStorage.getItem('token') || this.userService.getToken();
    console.log("Token:", this.token);
  }

  loadQuestions(questionId: number): void {
    this.userService.getQuestionById(questionId).subscribe(
      data => {
        this.currentQuestion = data;
        this.loadQuestion(this.currentQuestion);
      },
      error => {
        console.error('Error loading question:', error);
      }
    );
  }

  loadQuestion(question: any): void {
    if (!question) {
      console.error('Question is undefined');
      return;
    }
    
    this.currentQuestion = question;
    this.fields = this.createFieldConfig(question);
  }

  createFieldConfig(question: any): FormlyFieldConfig[] {
    switch (question.type) {
      case 'pdf':
        return [{
          key: 'pdf',
          type: 'pdf',
          templateOptions: {
            heading: question.heading,
            suggestion: question.suggestion,
            pdfUrl: question.pdfUrl,
            onNext: () => this.next(),
          },
        }];
      case 'static':
        return [{
          key: 'static',
          type: 'static',
          templateOptions: {
            heading: question.heading,
            subheading: question.smallHeading,
            content: question.content,
            onNext: () => this.next(),
          },
        }];
      case 'radio':
        if (question.options) {
          return [{
            key: 'answer',
            type: 'radio',
            templateOptions: {
              label: question.text,
              options: question.options.map((option: any) => ({
                value: option.id,
                label: option.text,
              }))
            },
          }];
        }
        break;
      default:
        console.error('Unexpected question type or missing options:', question);
        return [];
    }
    // Ensure a return statement for all paths
    return [];
  }

  next(): void {
    let nextQuestionId: number | null = null;

    if (this.currentQuestion.type === 'pdf') {
      nextQuestionId = this.currentQuestion.options?.[0]?.nextQuestionId || null;
    } else {
      const answer = (this.form.value as any).answer || null;
      if (answer !== null) {
        this.userResponses.push({ questionId: this.currentQuestion.id, optionId: answer, token: this.token ?? '' });
        this.answerMap[this.currentQuestion.id] = answer;
      }

      nextQuestionId = this.getNextQuestionId(answer);
    }

    if (nextQuestionId) {
      this.loadNextQuestion(nextQuestionId);
    } else {
      console.log('Survey completed:', this.userResponses);
    }
  }

  getNextQuestionId(answer: string | null): number | null {
    if (answer !== null && this.currentQuestion.options && Array.isArray(this.currentQuestion.options)) {
      const selectedOption = this.currentQuestion.options.find((option: any) => option.id === +answer);
      return selectedOption ? selectedOption.nextQuestionId : this.currentQuestion.nextQuestionId;
    }
    return this.currentQuestion.nextQuestionId;
  }

  loadNextQuestion(nextQuestionId: number): void {
    this.userService.getQuestionById(nextQuestionId).subscribe(
      nextQuestion => {
        this.previousQuestions.push(this.currentQuestion);
        this.loadQuestion(nextQuestion);
        this.form.reset();
      },
      error => {
        console.error('Next question not found:', error);
      }
    );
  }

  goBack(): void {
    if (this.previousQuestions.length > 0) {
      const previousQuestion = this.previousQuestions.pop();
      this.loadQuestion(previousQuestion);
      this.form.patchValue({ answer: this.answerMap[previousQuestion.id] || '' });
    }
  }

  canGoBack(): boolean {
    return this.previousQuestions.length > 0;
  }

  submitAll(): void {
    if (this.token) {
      const userResponsesWithToken: UserResponseDTO[] = this.userResponses.map(response => ({
        ...response,
        token: this.token ?? ''  // Ensure token is a string
      }));

      this.userService.saveUserResponses(userResponsesWithToken).subscribe(
        response => {
          console.log('All responses submitted:', response);
        },
        error => {
          console.error('Error submitting responses:', error);
        }
      );
    } else {
      console.error('No token available');
    }
  }

  isPdfType(): boolean {
    return this.currentQuestion && this.currentQuestion.type === 'pdf';
  }

  isStaticTextType(): boolean {
    return this.currentQuestion && this.currentQuestion.type === 'static';
  }
}
  

export interface Option {
  id: number;
  text: string;
  nextQuestionId: number | null;

}
