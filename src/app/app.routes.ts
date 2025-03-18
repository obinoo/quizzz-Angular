import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';

export const routes: Routes = [
    {
      path: '',
      component: CreateRoomComponent
    },
    {
       path: 'join',
       component: JoinRoomComponent
    },
    {
        path:'quiz',
        component: QuizComponent
    },
    {
        path:'result',
        component: ResultComponent
    }
];
