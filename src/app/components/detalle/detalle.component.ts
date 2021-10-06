import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline'

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  }

  constructor(private movieService: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) {}

  ngOnInit() {
    this.dataLocal.existePelicula(this.id)
      .then(existe => this.estrella = (existe) ? 'star': 'star-outline');
    
    this.movieService.getPeliculaDetalle(this.id).subscribe((res) => {
      this.pelicula = res;
    });
    this.movieService.getActoresPelicula(this.id).subscribe((res) => {
      this.actores = res.cast;
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star': 'star-outline';
  };
}
