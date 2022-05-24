import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private URL = 'https://appfirebasecrud-bdeb7.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel) {
    return this.http.post(`${this.URL}/heroes.json`, heroe)
    .pipe(
        map((resp: any ) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe( heroe: HeroeModel) {

    // Me creo un héroe temporal

    const heroeTemp = {
      ...heroe            // Copio las propiedades
    };

    delete heroeTemp.id;

    // Método pipe de los observables que transform, una data en otra con un formato deseado

    return this.http.put(`${this.URL}/heroes/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe( id: string ) {

    // Mismo url que para obtener un sólo héroe
    return this.http.delete(`${ this.URL}/heroes/${ id }.json`);
  }

  getHeroe( id: string ) {
    return this.http.get(`${ this.URL}/heroes/${ id }.json`);
  }

  getHeroes() {

    return this.http.get(`${ this.URL}/heroes.json`)
      .pipe(
        map(this.crearArreglo)
      );
  }

  private crearArreglo( heroesObj: object ) {

    const heroes: HeroeModel[] = [];
    console.log( heroesObj);

    if ( heroesObj === null ) { return []; }

    Object.keys( heroesObj).forEach (key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);

    });

    return heroes;

  }
}

