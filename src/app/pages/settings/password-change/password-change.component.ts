import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../../services/user.service';
import { IUser, IUserRegister } from '../../../models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-change',
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
  ],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss'
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  login: string = null;
  oldPassword: string;
  newPassword: string;
  visible: boolean = false;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    console.log("OnInit -> ChangePasswordComponent")
  }

  ngOnDestroy(): void {
    console.log("OnDestroy -> ChangePasswordComponent")
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  // onNewPassword(ev: Event): void {
  //   const postObj = {login: sessionStorage.getItem('login'), password: this.newPassword} as IUser
  //   this.userService.setUser(postObj).subscribe(
  //     () => {
  //       console.log("успешно"),
  //     () => {
  //       console.log("ошибка")}
  //     })
  //   }
}