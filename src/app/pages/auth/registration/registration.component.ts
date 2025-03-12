import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-registration',
  imports: [NgClass, FormsModule, ButtonModule, CheckboxModule, InputTextModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  
  login: string = null;
  password: string;
  repeatPassword: string;
  cardNumber: string;
  email: string;
  isRemember: boolean;
  labelText = 'Сохранить пользователя в хранилище';
constructor(private userService: UserService) {
}

ngOnInit(): void {
  // this.userService
  
}

onAuth(ev: Event): void {
console.log('ev', ev)
this.userService.addUser({login: this.login, password: this.password});
}
input(ev:Event): void {
  console.log('sd', ev)
}
 }

