import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';
import { ITourType } from '../../models/tour/tour';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-aside',
  imports: [SelectModule, FormsModule, DatePickerModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit, OnDestroy {
  private tourService = inject(ToursService);
  
  date: Date = null;
  selectedType: ITourType = null; // TODO defined type
 subscription: Subscription;
      
  tourTypes: ITourType[] = [     // TODO defined type
    {key: 'single', label: 'Одиночный'},
    {key: 'group', label: 'Групповой'},
    {key: 'all', label: 'Все'}
  ]
  
  ngOnInit(): void {
    this.selectedType = this.tourTypes.find((type) => type.key === 'all');
  }
  changeTourType(ev: SelectChangeEvent): void {
    this.tourService.initChangeTourType(this.selectedType);
    console.log(this.selectedType);
  }
  changeDate(ev: Date): void {
    console.log('date', ev);
    this.tourService.initChangeTourDate(ev);
  }

  clearDate(ev: Date): void {
    console.log('date****');
    this.date = null;
   this.tourService.initChangeTourDate(this.date);
   this.tourService.initChangeTourType(this.selectedType);
    
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
