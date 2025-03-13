import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [CommonModule, RouterModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit{

 score : number = 0;
 total: number = 0;

 constructor(private route: ActivatedRoute, private router: Router){}

 ngOnInit() {
  this.route.queryParams.subscribe((params)=>{
    this.score = +params['score']; 
    this.total = +params['total'];
  })
}

 retryQuiz(){
  this.router.navigate(['/']);
 }
}
