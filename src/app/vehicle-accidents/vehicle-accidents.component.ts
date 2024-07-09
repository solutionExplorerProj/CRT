import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionService } from './question-service';



  interface FormModel {
    answer: string;
  }
@Component({
  selector: 'app-vehicle-accidents',
  templateUrl: './vehicle-accidents.component.html',
  styleUrls: ['./vehicle-accidents.component.scss']
})
export class VehicleAccidentsComponent implements OnInit  {
  form = new FormGroup({});
  model: FormModel = { answer: '' };
  fields: FormlyFieldConfig[] = [];
  questions: any[] = [];
  currentQuestion: any;
  userResponses: any[] = [];
  previousQuestions: any[] = []; // Stack to keep track of previous questions
  answerMap: { [key: string]: string } = {}; // Map to store selected answers

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = data;
      if (this.questions.length > 0) {
        this.loadQuestion(this.questions[0]);
      }
    });
  }
  loadQuestion(question: any): void {
    if (!question) {
      console.error('Question is undefined');
      return;
    }
  
    this.currentQuestion = question;
  
    if (question.pdfUrl) {
      this.fields = [
        {
          key: 'pdf',
          type: 'pdf',
          templateOptions: {
            heading: 'Suggested Resource',
            text: 'Please read this information sheet. It\'s relevant to your exploration.',
            pdfUrl: question.pdfUrl,
            onNext: () => this.next(),
          },
        },
      ];
    } else if (question.isStaticText) {
      this.fields = [
        {
          key: 'staticText',
          type: 'static-text',
          templateOptions: {
            heading: question.heading,
            smallHeading: question.smallHeading,
            content: question.content,
          },
        },
      ];
    } else {
      this.fields = [
        {
          key: 'answer',
          type: 'radio',
          templateOptions: {
            label: question.question,
            options: question.options.map((option: any) => ({
              value: option.text,
              label: option.text,
              selected: this.answerMap[question.id] === option.text // Check if option was previously selected
            })),
            required: true,
          },
        },
      ];
    }
  }

  next(): void {
    if (!this.currentQuestion) {
      console.error('Current question is undefined');
      return;
    }
  
    const answer = (this.form.value as FormModel).answer;
    this.userResponses.push({ questionId: this.currentQuestion.id, answer: answer });
    this.answerMap[this.currentQuestion.id] = answer; // Save selected answer to map
  
    const nextQuestionId = this.currentQuestion.options?.find((option: any) => option.text === answer)?.nextQuestionId || this.currentQuestion.nextQuestionId;
    
    if (nextQuestionId) {
      this.previousQuestions.push(this.currentQuestion); // Save current question to stack
      const nextQuestion = this.questions.find(q => q.id === nextQuestionId);
      if (nextQuestion) {
        // Check if next question's answer was previously selected
        if (this.answerMap[nextQuestion.id]) {
          this.loadQuestion(nextQuestion);
          this.form.patchValue({ answer: this.answerMap[nextQuestion.id] }); // Set previously selected answer in form
          this.model.answer = this.answerMap[nextQuestion.id]; // Set previously selected answer in model
        } else {
          this.loadQuestion(nextQuestion);
          this.form.reset();
          this.model.answer = ''; // Reset model for the next question
        }
      } else {
        console.error('Next question not found for id:', nextQuestionId);
      }
    } else {
      console.log('Survey completed:', this.userResponses);
      // You can send the responses to the backend here
    }
  }
  

  submit(): void {
    if (!this.currentQuestion) {
      console.error('Current question is undefined');
      return;
    }

    const answer = (this.form.value as FormModel).answer;
    this.userResponses.push({ questionId: this.currentQuestion.id, answer: answer });
    this.answerMap[this.currentQuestion.id] = answer; // Save selected answer to map

    const nextQuestionId = this.currentQuestion.options.find((option: any) => option.text === answer)?.nextQuestionId;
    if (nextQuestionId) {
      this.previousQuestions.push(this.currentQuestion); // Save current question to stack
      const nextQuestion = this.questions.find(q => q.id === nextQuestionId);
      if (nextQuestion) {
        // Check if next question's answer was previously selected
        if (this.answerMap[nextQuestion.id]) {
          this.loadQuestion(nextQuestion);
          this.form.patchValue({ answer: this.answerMap[nextQuestion.id] }); // Set previously selected answer in form
          this.model.answer = this.answerMap[nextQuestion.id]; // Set previously selected answer in model
        } else {
          this.loadQuestion(nextQuestion);
          this.form.reset();
          this.model.answer = ''; // Reset model for the next question
        }
      } else {
        console.error('Next question not found for id:', nextQuestionId);
      }
    } else {
      console.log('Survey completed:', this.userResponses);
      // You can send the responses to the backend here
    }
  }

  goBack(): void {
    if (this.previousQuestions.length > 0) {
      const previousQuestion = this.previousQuestions.pop();
      if (previousQuestion) {
        this.currentQuestion = previousQuestion;
        this.loadQuestion(this.currentQuestion);
        this.form.patchValue({ answer: this.answerMap[this.currentQuestion.id] }); // Set previous answer in form
        this.model.answer = this.answerMap[this.currentQuestion.id]; // Set previous answer in model
      }
    }
  }


canGoBack(): boolean {
  return this.previousQuestions.length > 0;
}

isPdfType(): boolean {
  return this.fields && this.fields.length > 0 && this.fields[0].type === 'pdf';
}
}