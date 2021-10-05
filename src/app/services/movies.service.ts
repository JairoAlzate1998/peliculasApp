import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private _httpClientModule: HttpClient ) { }

  getFeature() {
    return this._httpClientModule.get<RespuestaMDB>(`http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-01-01&primary_release_date.lte=2021-01-31&api_key=d0fbda3a560e06c083c26dd998d038fc&language=es&include_image_language=es`);
  }
}
