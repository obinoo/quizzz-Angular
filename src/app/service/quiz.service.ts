import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }
  
  getQuestions() {
    return this.http.get("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
      .pipe(
        map((response: any) => {
          return response.results.map((result: any) => ({
            text: result.question,
            options: [...result.incorrect_answers, result.correct_answer],
            correctAnswer: result.correct_answer
          }));
        })
      );
  }
}
