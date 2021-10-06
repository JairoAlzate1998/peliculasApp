import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  private _storage: Storage | null = null;
  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    const existe = this.peliculas.find((peli) => peli.id === pelicula.id);
    var ex = false;
    if (!existe) {
      this.peliculas.unshift(pelicula);
      this.presentToast('Agregado a Favoritos');
      ex = true;
    }else{
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      this.presentToast('Removido de Favoritos');
      ex = false;
    }
    this._storage.set('favoritos', this.peliculas);
    return (ex);
  }

  async cargarFavoritos() {
    let storageData = await this.storage.create();
    this._storage = storageData;
    const favoritos = await this._storage.get('favoritos');

    if (favoritos) {
      this.peliculas = favoritos;
    } 
    return this.peliculas;
  }

  async existePelicula( id ){    
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    return (existe)? true: false;
  }
}
