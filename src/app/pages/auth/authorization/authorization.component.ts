import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule ],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  
  login: string;
  password: string;
 constructor(private userService: UserService,
  private messageService: MessageService,
  private router: Router
 ) { }

ngOnInit(): void {
  // this.userService
}
ngOnDestroy(): void {}

onAuth(): void{

const user: IUser ={
  login: this.login,
  password: this.password,
}
this.userService.authUser(user).subscribe(
  () => {this.initToast('success','Вход выполнен')
    // this.messageService.add({ severity: 'success', detail: 'Регистрация прошла успешно' });
  this.router.navigate(['tickets']);
  },
  () => {this.initToast('error','Ошибка входа')
    // this.messageService.add({ severity: 'error', detail: 'Произошла ошибка' });
  }
);
}


initToast(type: 'error' | 'success', text: string): void {
  this.messageService.add({ severity: type, detail: text, life: 3000 });
}
}
