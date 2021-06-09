import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/interfaces/country-response';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public countries: Country[] = []
  public topCountries: Country[] = []
  //TODO: Refactorizar
  public sortByCountry: boolean = false
  public sortByCity: boolean = false


  constructor( private countriesService: CountriesService, private router:Router) { }

  ngOnInit(): void {  
    if (this.countries.length == 0) {
      this.countriesService.getCountries()
      .subscribe(resp => {
        this.countries = resp
        this.refreshTopCountries()
      })
    }
  }

  refreshTopCountries(){
    this.topCountries = []
    while (this.topCountries.length < 10) {   
      let random = Math.floor(Math.random() * this.countries.length)
      let newCountry = this.countries[random]
      let repeated = false 
  
      this.topCountries.map( a => {
        if (a == newCountry) {
          repeated = true       
        }
      })
      //Por si el país es repetido
      if (!repeated) {
        this.topCountries.push(newCountry)
      }
    }   
    this.sortByCountry = false
    this.sortByCity = false
  }

  saveTopCountries(){
    this.countriesService.postCountries(this.topCountries)
  }

  onMoreClick(country:Country){
    this.router.navigate(['/country',country.alpha2Code])
  }

  sortCountries(prop){
    this.topCountries.sort((a,b) => (a[prop] > b[prop]) ? 1 : -1);
    (prop == 'name') ? this.sortByCountry = true : this.sortByCountry = false;
    (prop == 'capital') ? this.sortByCity = true : this.sortByCity= false
  }

}
