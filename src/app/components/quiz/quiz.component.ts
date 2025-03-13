import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { Question } from '../../model/interface/question';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{

  questions: Question[] = [];
  currentIndex: number = 0; // used to track the index of the question
  score: number = 0;
  timeLeft: number = 20; 
  loading: boolean = true; 

  constructor(private service : QuizService, private router: Router){}

  ngOnInit() {
   this.loadPost();
   this.timerLeft();
  }

  loadPost(){
   this.service.getQuestions().subscribe({
    next: (questions: Question[]) => {
      if (questions && questions.length > 0) {
        this.questions = questions;
        this.currentIndex = 0; 
      }
    },
    error: (err: any) => {
      console.error('Error fetching questions', err);
      // this.questions = []; 
      //   this.loading = false;
    }
   });
  }

  nextQuestion(){
   if(this.currentIndex < this.questions.length - 1){
    this.currentIndex++
    this.timeLeft=20;
    this.timerLeft();
   }else{
    // alert("Your score is " + this.score)
   this.router.navigate(['result'], {queryParams: {score: this.score, total: this.questions.length}})
   console.log(this.score + '/' + this.questions.length)
   }
  }

  selectOption(i: number){
   if( this.questions[this.currentIndex].correctAnswer === this.questions[this.currentIndex].options[i])
    this.score++
  }

  timerLeft(){
  setInterval(()=>{
    if(this.timeLeft > 0){
      this.timeLeft--
    }else{
      this.nextQuestion();
    }
  },1000)
  }
}
