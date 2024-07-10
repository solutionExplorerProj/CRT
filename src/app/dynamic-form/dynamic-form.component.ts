import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { QuestionService } from './question-service';


interface FormModel {
  answer: string;
}
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() jsonFilename: string = '';

  form = new FormGroup({});
  model: FormModel = { answer: '' };
  fields: FormlyFieldConfig[] = [];
  questions: any[] = [];
  currentQuestion: any;
  userResponses: any[] = [];
  previousQuestions: any[] = [];
  answerMap: { [key: string]: string } = {};

  constructor(private questionService: QuestionService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jsonFilename && changes.jsonFilename.currentValue) {
      this.loadQuestions(changes.jsonFilename.currentValue);
    }
  }

  loadQuestions(filename: string): void {
    this.questionService.getQuestions(filename).subscribe(data => {
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
            suggestion: question.suggestion,
            pdfUrl: question.pdfUrl,
            onNext: () => this.next(),
          },
        },
      ];
    } else if (question.type === 'static') {
      this.fields = [
        {
          key: 'static',
          type: 'static',
          templateOptions: {
            heading: question.heading,
            subheading: question.smallHeading,
            content: question.content,
            onNext: () => this.next(),
          },
        },
      ];
    } else if (question.options && Array.isArray(question.options)) {
      this.fields = [
        {
          key: 'answer',
          type: 'radio',
          templateOptions: {
            label: question.question,
            options: question.options.map((option: any) => ({
              value: option.text,
              label: option.text,
              selected: this.answerMap[question.id] === option.text
            })),
            required: true,
          },
        },
      ];
    } else {
      console.error('Unexpected question type or missing options:', question);
    }
  }

  next(): void {
    if (!this.currentQuestion) {
      console.error('Current question is undefined');
      return;
    }

    let answer: string | null = null;
    if (this.form.value.hasOwnProperty('answer')) {
      answer = (this.form.value as any).answer;
    }

    if (answer !== null) {
      this.userResponses.push({ questionId: this.currentQuestion.id, answer: answer });
      this.answerMap[this.currentQuestion.id] = answer;
    }

    let nextQuestionId: number | null = null;

    if (this.currentQuestion.options && Array.isArray(this.currentQuestion.options)) {
      const selectedOption = this.currentQuestion.options.find((option: any) => option.text === answer);
      nextQuestionId = selectedOption ? selectedOption.nextQuestionId : this.currentQuestion.nextQuestionId;
    } else {
      nextQuestionId = this.currentQuestion.nextQuestionId;
    }

    if (nextQuestionId) {
      const nextQuestion = this.questions.find(q => q.id === nextQuestionId);
      if (nextQuestion) {
        this.previousQuestions.push(this.currentQuestion);
        this.loadQuestion(nextQuestion);

        if (nextQuestion.options && this.answerMap[nextQuestion.id]) {
          this.form.patchValue({ answer: this.answerMap[nextQuestion.id] });
          this.model.answer = this.answerMap[nextQuestion.id];
        } else {
          this.form.reset();
          this.model.answer = '';
        }
      } else {
        console.error('Next question not found for id:', nextQuestionId);
      }
    } else {
      console.log('Survey completed:', this.userResponses);
    }
  }

  goBack(): void {
    if (this.previousQuestions.length > 0) {
      const previousQuestion = this.previousQuestions.pop();
      if (previousQuestion) {
        this.currentQuestion = previousQuestion;
        this.loadQuestion(this.currentQuestion);
        this.form.patchValue({ answer: this.answerMap[this.currentQuestion.id] });
        this.model.answer = this.answerMap[this.currentQuestion.id];
      }
    }
  }

  canGoBack(): boolean {
    return this.previousQuestions.length > 0;
  }

  isPdfType(): boolean {
    return this.fields && this.fields.length > 0 && this.fields[0].type === 'pdf';
  }

  isStaticTextType(): boolean {
    return this.fields && this.fields.length > 0 && this.fields[0].type === 'static';
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
}