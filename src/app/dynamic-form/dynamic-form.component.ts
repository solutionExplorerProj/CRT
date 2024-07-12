import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionService } from './question-service';
import { Question } from '../question-module';

import { UserService } from '../user-service';


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
  model: FormModel = { answer: '' };
  fields: FormlyFieldConfig[] = [];
  currentQuestion: any;
  userResponses: any[] = [];
  previousQuestions: any[] = [];
  answerMap: { [key: string]: string } = {};

  constructor(private questionService: UserService) {}

  ngOnInit(): void {
    // Load the initial question with ID 1
    this.loadQuestions(1);
  }

  loadQuestions(questionId: number): void {
    this.questionService.getQuestionById(questionId).subscribe(
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
    if (question.type === 'pdf') {
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
    } else if (question.type === 'static') {
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
    } else if (question.type === 'radio' && question.options) {
      return [{
        key: 'answer',
        type: 'radio',
        templateOptions: {
          label: question.text,
          options: question.options.map((option: any) => ({
            value: option.text,
            label: option.text,
          })),
          required: true,
        },
      }];
    } else {
      console.error('Unexpected question type or missing options:', question);
      return [];
    }
  }
  

  next(): void {
    const answer = (this.form.value as FormModel).answer || null;
    if (answer !== null) {
      this.userResponses.push({ questionId: this.currentQuestion.id, answer });
      this.answerMap[this.currentQuestion.id] = answer;
    }

    const nextQuestionId = this.getNextQuestionId(answer);
    if (nextQuestionId) {
      this.loadNextQuestion(nextQuestionId);
    } else {
      console.log('Survey completed:', this.userResponses);
    }
  }

  getNextQuestionId(answer: string | null): number | null {
    if (this.currentQuestion.options && Array.isArray(this.currentQuestion.options)) {
      const selectedOption = this.currentQuestion.options.find((option: any) => option.text === answer);
      return selectedOption ? selectedOption.nextQuestionId : this.currentQuestion.nextQuestionId;
    }
    return this.currentQuestion.nextQuestionId;
  }

  loadNextQuestion(nextQuestionId: number): void {
    this.questionService.getQuestionById(nextQuestionId).subscribe(nextQuestion => {
      this.previousQuestions.push(this.currentQuestion);
      this.loadQuestion(nextQuestion);
      this.form.reset();
    }, error => {
      console.error('Next question not found:', error);
    });
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

  submit(): void {
    if (!this.currentQuestion) {
        console.error('Current question is undefined');
        return;
    }
    
    const answer = (this.form.value as FormModel).answer;
    const questionData = {
        id: this.currentQuestion.id,
        text: this.currentQuestion.text,
        type: this.currentQuestion.type, // This will be "radio", "static", or "pdf"
        options: this.currentQuestion.options, // This should include options only if type is "radio"
    };

    // Handle sending the data to your backend service
    // this.questionService.submitQuestion(questionData).subscribe(response => {
    //     console.log('Question submitted:', response);
    //     // Handle the response as needed
    // }, error => {
    //     console.error('Error submitting question:', error);
    // });
}


  isPdfType(): boolean {
    return this.currentQuestion && this.currentQuestion.pdfUrl !== undefined;
  }
  isStaticTextType(): boolean {
    return this.currentQuestion && this.currentQuestion.type === 'static';
  }
  
}
  

export interface Option {
  id: number;
  text: string;
  nextQuestionId: number | null;
  pdfUrl?: string;
  suggestion?: string;
  type?: string;
  heading?: string;
  smallHeading?: string;
  content?: string;
}
