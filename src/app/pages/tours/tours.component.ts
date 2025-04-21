import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule } from 'primeng/card'
import { ActivatedRoute, Route, Router } from '@angular/router';
// import { log } from 'console'
import { ITour, ITourType } from '../../models/tour/tour';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { Subscription } from 'rxjs';
import { isValid } from "date-fns";

@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    SearchPipe,
    FormsModule,
    HighlightActiveDirective
  ],

  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
//   encapsulation: ViewEncapsulation.None
})
export class ToursComponent implements OnInit, OnDestroy{ 
  tours: ITour[] = []; //TODO add types
  toursStore: ITour[] = [];
  tourDate: any = null;
  tourType: any = null;
  tourTypeSubscriber: Subscription;
  tourDateSubscriber: Subscription;


  // searchValue = '';

  constructor (private toursService: ToursService,
    private route: ActivatedRoute,
    private router: Router){}

    ngOnInit(): void {

      this.tourTypeSubscriber = this.toursService.tourType$.subscribe((tour) => {
        // console.log('tour type', tour)
        switch (tour?.key) {
          case 'single':
            this.tours = this.toursStore.filter((item) => item.type === 'single');
            break;
          case 'group':
            this.tours = this.toursStore.filter((item) => item.type === 'group');
            break;
          case 'all':
            this.tours = [...this.toursStore];
            break;
        }
  
      });
  
      //Date 
      this.tourDateSubscriber = this.toursService.tourDate$.subscribe((date) => {
        // console.log('******date', date)
  
        this.tours = this.toursStore.filter((tour) => {
          if (isValid(new Date(tour.date))) {
  
            const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);
            const calendarDate = new Date(date).setHours(0, 0, 0);
            return tourDate === calendarDate;
          } else {
            return false
          }
        });
      })
  
      console.log('Activated route = ', this.route)
      this.toursService.getTours().subscribe((data) => {
        if (Array.isArray(data?.tours)) {
          this.tours = data.tours;
          this.toursStore = [... data.tours]
        }
      })
  
    }
//   ngOnInit(): void {
//     // console.log('activetdRouter', this.route)
//     // this.toursService.getTours().subscribe((data) => {
//     //   if (Array.isArray(data?.tours)) {
//     //     this.tours = data.tours;
//     //     this.toursStore = [...data.tours];
//     //   }
//     // });

//     //types
//     this.toursService.tourType$.subscribe((tourKey: ITourType) => {
//       this.tourType = tourKey;
//       this.initFilterLogic();
//       // console.log('tour', tourKey)
//       // switch (tourKey) {
//       //   case 'group':
//       //     this.tours = this.toursStore.filter((el) => el.type === 'group')
//       //     break;
//       //     case 'single':
//       //     this.tours = this.toursStore.filter((el) => el.type === 'single')
//       //     break;
//       //     case 'all':
//       //     this.tours = [...this.toursStore];
//       //     break;
    
//       })
    
// //date
//     this.toursService.tourDate$.subscribe((date) => {
//       console.log('****date', date)
//       this.tourDate = date;
//       this.initFilterLogic();
      
//     })

//     console.log('activetdRoute', this.route)
//     this.toursService.getTours().subscribe((data) => {
//       if (Array.isArray(data?.tours)) {
//         this.tours = data.tours;
//         this.toursStore = [...data.tours];
//       }
//     });


//   }
  goToTour(item: ITour): any { // TODO add interface
    this.router.navigate(['tour', item.id], {relativeTo: this.route});
  
  }
  
//   initFilterLogic() {
//     if (this.tourDate){
//     this.tours = this.toursStore.filter((tour) => {
//       if (isValid(new Date(tour.date))) {
//         const tourDate = new Date(tour.date).setHours(0, 0, 0, 0); // обнуляем часы/минуты/секунды/милисекунды
//         console.log('*****tourDate*', tourDate)
//         const calendarDate = new Date(this.tourDate).setHours(0, 0, 0); // обнуляем часы/минуты/секунды
//         console.log('*****calendarDate*', calendarDate)
//         return tourDate === calendarDate;
//       } else {
//         return false;
//       }
//     })
//     }
//   if (this.tourType) {
//     const tourStore = this.tourDate ? this.tours : this.toursStore
//     switch (this.tourType) {
//     case 'group':
//           this.tours = tourStore.filter((el) => el.type === 'group')
//           break;
//           case 'single':
//           this.tours = tourStore.filter((el) => el.type === 'single')
//           break;
//           case 'all':
//           this.tours = [...tourStore];
//           break;
//   }
// }
// }
ngOnDestroy(): void {
  this.tourTypeSubscriber.unsubscribe()
  this.tourDateSubscriber.unsubscribe()
}

  searchTour(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore, targetValue);
  }

  selectActive(index: number): void {
    console.log('index', index)
    const targetTour = this.tours.find((tour, i) => i === index);
    if (targetTour) {
      this.goToTour(targetTour);
    }
  }
  
}
  
