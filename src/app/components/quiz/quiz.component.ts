import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz/quiz.service';
import { Question } from '../../model/interface/question';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../../service/socket/socket-service.service';

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
  roomCode: string = '';
  isHost: boolean = false;

  constructor(private service : QuizService, private router: Router, private socketService: SocketService){}

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


  setupSocket(){
     // Listen for room creation
     this.socketService.on('roomCreated').subscribe((roomCode) => {
      this.roomCode = roomCode;
      this.isHost = true;
    });

       // Listen for new questions
       this.socketService.on('nextQuestion').subscribe((question) => {
        this.questions = [question]; // Update the current question
        this.currentIndex = 0;
        this.timeLeft = 20;
        this.timerLeft();
      });

      // Listen for quiz end
    this.socketService.on('quizEnded').subscribe((scores) => {
      this.router.navigate(['/result'], {
        queryParams: { score: this.score, total: this.questions.length },
      });
    })
  }

  createRoom() {
    this.socketService.emit('createRoom');
  }

  joinRoom() {
    if (this.roomCode) {
      this.socketService.emit('joinRoom', this.roomCode);
    }
  }

  startQuiz() {
    if (this.isHost) {
      this.socketService.emit('startQuiz', this.questions);
    }
  }

  nextQuestion(){
   if(this.currentIndex < this.questions.length - 1){
    this.currentIndex++
    this.timeLeft=20;
    this.timerLeft();
   }else{
    this.socketService.emit('nextQuestion', this.roomCode);
    // alert("Your score is " + this.score)
  //  this.router.navigate(['result'], {queryParams: {score: this.score, total: this.questions.length}})
  //  console.log(this.score + '/' + this.questions.length)
   }
  }

  selectOption(i: number){
    const isCorrect =
    this.questions[this.currentIndex].correctAnswer ===
    this.questions[this.currentIndex].options[i];
  this.socketService.emit('submitAnswer', isCorrect);
  if (isCorrect) this.score++;
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
