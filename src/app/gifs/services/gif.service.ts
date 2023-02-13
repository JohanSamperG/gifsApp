import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Data, GifData } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})

export class GifService {

  private apiKey: string = 'aK6dTfUgBDOt0nYUMNZLVpTK0F2y424c'
  private urlBase: string = 'https://api.giphy.com/v1/gifs'

  private _historial: string[] = [];
  public resultados : Data[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('ultimoResultado')!) || [];
  }

  buscarGifs(query:string){

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,9);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('q', query)
          .set('limit', '20')


    this.http.get<GifData>(`${this.urlBase}/search`, {params})
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('ultimoResultado', JSON.stringify(this.resultados));
    });

    
  }

}
