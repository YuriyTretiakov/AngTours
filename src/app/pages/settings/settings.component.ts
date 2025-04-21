import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ISettings } from '../../models/settings';
import { ChangePasswordComponent } from './password-change/password-change.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ButtonModule, 
    // ChangePasswordComponent, 
    RouterOutlet, RouterLink],
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent 
// implements OnInit 
{
  
  // @ViewChild(ChangePasswordComponent) changePasswordComponent: ChangePasswordComponent;
  menuItems =[

      {path: "change-password",
       label: "Смена пароля"
      },
      {path: "statistics",
       label: "Статистика"
      }
    ];



  // menuItems: ISettings[] = [];

  // ngOnInit(): void {
  //   this.menuItems = [
  //     {label: "Смена пароля", path: "change-password"},
  //     {label: "Статистика", path: "statistics"}
  //   ]
  // }

  // onMenuItemClick(path: string): void {
  //   if (path === 'change-password') {
  //     this.changePasswordComponent.show();
  //   }
  // }
}