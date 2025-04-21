import { DatePipe } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [ DatePipe, MenubarModule, ButtonModule, RouterModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent implements OnInit, OnDestroy{
  dateTime: Date;
  
  user: IUser;
  logoutIcon = 'pi pi-user'
  loginIcon = 'pi pi-sign-in';
  isMenuOpen = false;

 constructor(private userService: UserService, private router: Router, private ngZone: NgZone) {}

 ngOnInit(): void {
  this.user = this.userService.getUser();
  // this.menuItems = this.initMenuItems();
  this.user = {"login": sessionStorage.getItem('login')};
  this.ngZone.runOutsideAngular(() => {
    setInterval(() => {
      this.dateTime = new Date();
     },1000);
  });
 }

 ngOnDestroy(): void { }

 menuItems: MenuItem[] = [
//  ];
//  MenuItems(): MenuItem[] {
//   return [
    {
      label: 'Билеты',
      routerLink: ['/tours'],
    },
    {
      label: 'Настройки',
      routerLink: ['settings'],
    },
    {
      label: 'Заказы',
      routerLink: ['/orders'],
    },
  ];
 
 logOut(): void {
  this.userService.setUser(null);
  this.router.navigate(['/auth']);
 }
 hoverLogoutBtn(val: boolean): void {
 if (this.user?.login) {

    this.logoutIcon = val ? 'pi pi-sign-in' : 'pi pi-user'
    } else {
      
      this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user';
    }
 }
//  toggleMenu() {
//   console.log("hello")
//   this.isMenuOpen = !this.isMenuOpen;
// }
}
