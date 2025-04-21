import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { filter, map, Subscription } from 'rxjs';
import { routes } from '../app.routes';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent, AsideComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy{
  
  showAside = false;
  subscription: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.showAside = this.recursFindChildData(this.activatedRoute.snapshot, 'showAside');


    this.subscription = this.router.events.pipe(
      filter((routes) => routes instanceof ActivationEnd),
      map((data) => data.snapshot)
    ).subscribe((data) => {
      console.log('route', data)
      this.showAside = this.recursFindChildData(data, 'showAside');
    });
  }
  recursFindChildData(children: ActivatedRouteSnapshot, prop: string): boolean {
    console.log('children', children)
    if (!children.data[prop] && children.firstChild) {
      return this.recursFindChildData(children.firstChild, prop);
      } else {
        return !!children.data[prop];
      }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
