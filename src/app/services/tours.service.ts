import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, Subject } from 'rxjs';
import { API } from '../shared/api';
import { ICountriesResponseItem, ITour, ITourServerResponse, ITourType } from '../models/tour/tour';

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

getTours(): Observable<ITour[]> { // TODO add types for responce
  const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
  const tours = this.http.get<ITourServerResponse>(API.tours);
  
  
  //parralel
  // return this.http.get<ITourServerResponse>(API.tours);
  return forkJoin<[ICountriesResponseItem[], ITourServerResponse]>([countries, tours]).pipe(
    map((data) => {
      console.log('data', data);
      let toursWithCountries = [] as ITour[];
      const toursArr = data[1].tours;
      const countriesMap = new Map();

      data[0].forEach(country => {
        countriesMap.set(country.iso_code2, country);
      });

      if (Array.isArray(toursArr)) {
        console.log('***toursArr', toursArr)
        toursWithCountries = toursArr.map((tour) => {
          return {
            ...tour,
            country: countriesMap.get(tour.code) || null //add new prop
          }

        });
      }
      return toursWithCountries;


    })
  )
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

getCountryByCode(code: string): Observable<any> {
  return this.http.get<any>(API.countryByCode, {params: {codes: code}});
}

}
