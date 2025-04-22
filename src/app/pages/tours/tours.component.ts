import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule } from 'primeng/card'
import { ActivatedRoute, Route, Router } from '@angular/router';
// import { log } from 'console'
import { ILocation, ITour, ITourServerResponse, ITourType } from '../../models/tour/tour';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { isValid } from "date-fns";
import { MapComponent } from '../../shared/components/map/map.component';
import { DialogModule } from 'primeng/dialog';

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
    HighlightActiveDirective,
    MapComponent,
    DialogModule,
  ],

  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
//   encapsulation: ViewEncapsulation.None
})
export class ToursComponent implements OnInit, OnDestroy{ 
  tours: ITour[] = []; //TODO add types
  toursStore: ITour[] = [];
  tourDate: Date;
  tourType: ITourType = {key: 'all'};
  // tourType: any = null;
  // tourTypeSubscriber: Subscription;
  // tourDateSubscriber: Subscription;
  destroyer = new Subject<boolean>();
  showModal = false;
  location: ILocation = null;


  // searchValue = '';

  constructor (private toursService: ToursService,
    private route: ActivatedRoute,
    private router: Router){}

    ngOnInit(): void {
      // Types
      this.toursService.tourType$.pipe(takeUntil(this.destroyer)).subscribe((tour) =>{
        console.log('tour', tour)
        this.tourType = tour;
        this.initTourFilterLogic();
      });
      // Date
      this.toursService.tourDate$.pipe(takeUntil(this.destroyer)).subscribe((date) =>{
        
        this.tourDate = date;
        console.log('****date', date)
        this.initTourFilterLogic();
      });

      // this.tourTypeSubscriber = this.toursService.tourType$.subscribe((tour) => {
      //   // console.log('tour type', tour)
      //   switch (tour?.key) {
      //     case 'single':
      //       this.tours = this.toursStore.filter((item) => item.type === 'single');
      //       break;
      //     case 'group':
      //       this.tours = this.toursStore.filter((item) => item.type === 'group');
      //       break;
      //     case 'all':
      //       this.tours = [...this.toursStore];
      //       break;
      //   }
  
      // });
  
      // //Date 
      // this.tourDateSubscriber = this.toursService.tourDate$.subscribe((date) => {
      //   // console.log('******date', date)
  
      //   this.tours = this.toursStore.filter((tour) => {
      //     if (isValid(new Date(tour.date))) {
  
      //       const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);
      //       const calendarDate = new Date(date).setHours(0, 0, 0);
      //       return tourDate === calendarDate;
      //     } else {
      //       return false
      //     }
      //   });
      // })
  
      console.log('Activated route = ', this.route)
      this.toursService.getTours().subscribe((data) => {
        if (Array.isArray(data)) {
          this.tours = data;
          this.toursStore = [... data]
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
ngOnDestroy(): void {
  // this.tourTypeSubscriber.unsubscribe()
  // this.tourDateSubscriber.unsubscribe()
  this.destroyer.next(true);
  this.destroyer.complete();
}
  goToTour(item: ITour): any { // TODO add interface
    this.router.navigate(['tour', item.id], {relativeTo: this.route});
  
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
    initTourFilterLogic() {
      // logic for type
      if (this.tourType) {
        // const tourStore = this.tourDate ? this.tours : this.toursStore
        switch (this.tourType.key) {
        case 'group':
              this.tours = this.toursStore.filter((el) => el.type === 'group')
              break;
              case 'single':
              this.tours = this.toursStore.filter((el) => el.type === 'single')
              break;
              case 'all':
              this.tours = [...this.toursStore];
              break;
      }
    }
    // logic for date


    if (this.tourDate){
    this.tours = this.tours.filter((tour) => {
      if (this.tourDate && isValid(new Date(this.tourDate))) {
        const tourDate = new Date(tour.date).setHours(0, 0, 0, 0); // обнуляем часы/минуты/секунды/милисекунды
        // console.log('*****tourDate*', tourDate)
        const calendarDate = new Date(this.tourDate).setHours(0, 0, 0); // обнуляем часы/минуты/секунды
        // console.log('*****calendarDate*', calendarDate)
        return tourDate === calendarDate;
      } else {
        return false;
      }
    })
    }
    
}
 getCountryDetail(ev: Event, code: string): void {
  ev.stopPropagation(); // TODO check
  this.toursService.getCountryByCode(code).subscribe((data) => {
    if (Array.isArray(data)) {
      const countryInfo = data[0];
      console.log('countryInfo', countryInfo)
      this.location = {lat: countryInfo.latlng[0], lng: countryInfo.latlng[1]};
      this.showModal = true;
    }
  });
 }
}
