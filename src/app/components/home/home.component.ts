import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TouristSpotDetailComponent } from '../tourist-spot-detail/tourist-spot-detail.component';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from '../app-bar/app-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AppBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items = [
    { city: 'Vancouver', attraction: 'Capilano Suspension Bridge', location: 'Vancouver - Capilano Suspension Bridge' },
    { city: 'Alberta', attraction: 'Banff National Park', location: 'Alberta - Banff National Park' },
    { city: 'Toronto', attraction: 'CN Tower', location: 'Toronto - CN Tower' },
    { city: 'Ottawa', attraction: 'Parliament Hill', location: 'Ottawa - Parliament Hill' },
    { city: 'Ontário', attraction: 'Niagara Falls', location: 'Ontário - Niagara Falls' },
    { city: 'Montreal', attraction: 'Botanic Garden', location: 'Montreal - Botanic Garden' },
    { city: 'Ottawa', attraction: 'National Gallery of Canada', location: 'Ottawa - National Gallery of Canada' },
    { city: 'Nova Scotia', attraction: 'Peggys Point Lighthouse', location: 'Nova Scotia - Peggys Point Lighthouse' },
    { city: 'Vancouver', attraction: 'Stanley Park', location: 'Vancouver - Stanley Park' },
    { city: 'Québec', attraction: 'Basilica-Cathedral Notre-Dame', location: 'Québec - Basilica-Cathedral Notre-Dame' }
  ];



  defaultBackground: string = 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/peggys-point-lighthouse.jpg';

  constructor(public dialog: MatDialog) { }

  selectedItem: any = null;

  openPopup(touristSpot: string): void {
    const videos: Record<string, string> = {
      'Vancouver - Capilano Suspension Bridge': 'https://www.youtube.com/embed/t8GSAhrFMZ0',
      'Alberta - Banff National Park': 'https://www.youtube.com/embed/LNnTHhQmjXk',
      'Toronto - CN Tower': 'https://www.youtube.com/embed/EqC_PWSKGrk',
      'Ottawa - Parliament Hill': 'https://www.youtube.com/embed/NbJoX2NA7JA',
      'Ontário - Niagara Falls': 'https://www.youtube.com/embed/mFW04CIvRQs',
      'Montreal - Botanic Garden': 'https://www.youtube.com/embed/hwbC9eLlv5s',
      'Ottawa - National Gallery of Canada': 'https://www.youtube.com/embed/530prRcY9pE',
      'Nova Scotia - Peggys Point Lighthouse': 'https://www.youtube.com/embed/wzYw5ZYdVqg',
      'Vancouver - Stanley Park': 'https://www.youtube.com/embed/fyI4r2agxUU',
      'Québec - Basilica-Cathedral Notre-Dame': 'https://www.youtube.com/embed/-JKs_rGUK1s',
    };

    const item = this.items.find(i => i.location === touristSpot);

    if (item && videos[touristSpot]) {
      this.dialog.open(TouristSpotDetailComponent, {
        data: {
          videoUrl: videos[touristSpot],
          city: item.city,
          attraction: item.attraction
        },
        width: '90vw',
        height: '80vh',
        maxWidth: '1200px',
        panelClass: 'full-screen-modal'
      });
    } else {
      console.error(`No video or item found for tourist spot: ${touristSpot}`);
    }
  }



  changeBackground(touristSpot: string): void {
    document.body.style.backgroundImage = `url(${this.getImageUrl(touristSpot)})`;
  }

  resetBackground(): void {
    document.body.style.backgroundImage = `url(${this.defaultBackground})`;
  }

  getImageUrl(touristSpot: string): string {
    const images = {
      'Vancouver - Capilano Suspension Bridge': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/capilano-suspension-bridge.jpg',
      'Alberta - Banff National Park': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/banff-national-park.jpg',
      'Toronto - CN Tower': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/cn-tower.jpg',
      'Ottawa - Parliament Hill': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/parliament-hill.jpg',
      'Ontário - Niagara Falls': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/niagara-falls.jpg',
      'Montreal - Botanic Garden': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/botanic-garden.jpg',
      'Ottawa - National Gallery of Canada': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/national-gallery-of-canada.jpg',
      'Nova Scotia - Peggy’s Point Lighthouse': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/peggys-point-lighthouse.jpg',
      'Vancouver - Stanley Park': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/stanley-park.jpg',
      'Québec - Basilica-Cathedral Notre-Dame': 'http://www.yazigi.com.br/galeria/repositorio/images/noticias/pontos-turisticos-canada/basilica-cathedral-notre-drame.jpg'
    };

    return images[touristSpot as keyof typeof images] || this.defaultBackground;
  }

}
