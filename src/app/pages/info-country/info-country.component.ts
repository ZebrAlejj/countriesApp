import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/interfaces/country-response';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-info-country',
  templateUrl: './info-country.component.html',
  styleUrls: ['./info-country.component.css']
})
export class InfoCountryComponent implements OnInit, AfterViewInit {

  public country:Country
  public code:string
  constructor( private activatedRoute: ActivatedRoute,
     private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params.code
    this.countriesService.getCountry(this.code)
    .subscribe(resp => 
      this.country = resp
    )
  }
  
  ngAfterViewInit():void{
    // this.countriesService.getCountry(this.code)
    // .subscribe(resp => 
    //   this.country = resp
    // )
  }
  
}
