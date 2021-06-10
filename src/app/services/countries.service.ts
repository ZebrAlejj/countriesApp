import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Country } from '../interfaces/country-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private baseUrl: string = 'https://restcountries.eu/rest/v2/';
  // public loading = false;

  constructor( private http: HttpClient) { }

  getCountries():Observable<Country[]>{
    //Consuminedo la API directamente
    return this.http.get<Country[]>(`${this.baseUrl}all?fields=name;capital;flag;population;alpha2Code`)
  }

  postCountries(countries:Country[]):Observable<Country>{
    countries.map(async (country) => { 
      const formData = new FormData()
      formData.append('name',country.name)
      formData.append('capital', country.capital)
      formData.append('flag', country.flag)
      
      
    //  await this.http.post<Country>(`${environment.url}`,formData)
    //  .subscribe( 
    //    (response) => console.log(response.name + ' inserted'),
    //    (error) => console.log('Country already exist')
    //  )
    })
    return
  }
  
  getCountry(code):Observable<Country>{
    return this.http.get<Country>(`${this.baseUrl}alpha/${code}`)
  }
}
