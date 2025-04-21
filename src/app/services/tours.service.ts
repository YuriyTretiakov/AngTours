import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API } from '../shared/api';
import { ITour, ITourServerResponse, ITourType } from '../models/tour/tour';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  //type
  private tourTypeSubject = new Subject<ITourType>(); // TODO define type
  readonly tourType$ = this.tourTypeSubject.asObservable();


  //date
  private tourDateSubject = new Subject<Date>(); // TODO define type
  readonly tourDate$ = this.tourDateSubject.asObservable();

  constructor(private http: HttpClient) { }

getTours(): Observable<ITourServerResponse> { // TODO add types for responce
  return this.http.get<ITourServerResponse>(API.tours);
}

getTourById(id: string): Observable<ITour> { // TODO add types for responce
  const tourApi = API.tour;
  return this.http.get<ITour>(`${tourApi}/${id}`);
}

getNearestTourByLocationId(id: string): Observable<ITour[]> {
  return this.http.get<ITour[]> (API.nearestTours, {
    params: { locationId: id}
  });
}

searchTours(tours: ITour[], value: string): ITour[] {
  if(Array.isArray(tours)) {
    return tours.filter((tour) => {
      if(tour && typeof tour.name=== 'string') {
        return tour.name.toLowerCase().includes(value.toLowerCase());
      } else {
        return false;
      }
    });
  } else {
    return [];
  }
}

initChangeTourType(val: ITourType): void {  // TODO add types
  this.tourTypeSubject.next(val);
}

initChangeTourDate(val: Date): void {  // TODO add types
  this.tourDateSubject.next(val);
}


// initClearTourDate(val: Date): void {  // TODO add types
//   this.tourDateSubject.next(val);

// }
}
