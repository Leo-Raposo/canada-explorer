import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from '../app-bar/app-bar.component';

@Component({
  selector: 'app-tourist-spots-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AppBarComponent],
  templateUrl: './tourist-spots-add.component.html',
  styleUrls: ['./tourist-spots-add.component.css']
})
export class TouristSpotsAddComponent implements OnInit {
  cidades: any[] = [];
  locais: any[] = [];
  pontos: any[] = [];
  selectedCity: string = '';
  selectedLocal: string = '';
  selectedPointId: string = '';
  hotel = {
    nome: '',
    imagem: '',
    localizacao: ''
  };
  restaurante = {
    nome: '',
    imagem: '',
    localizacao: ''
  };

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.loadCidades();
    this.loadPontos();
  }

  async loadCidades() {
    this.cidades = await this.supabaseService.getCidades();
  }

  async loadLocais() {
    if (this.selectedCity) {
      this.locais = await this.supabaseService.getLocaisByCity(this.selectedCity);
    }
  }

  async loadPontos() {
    this.pontos = await this.supabaseService.getPontos();
  }

  async addHotel() {
    const hotelData = {
      nome: this.hotel.nome,
      imagem: this.hotel.imagem,
      localizacao: this.hotel.localizacao,
      ponto_id: this.selectedPointId
    };

    const result = await this.supabaseService.addHotel(hotelData);
    if (result.error) {
      console.error('Error adding hotel:', result.error);
    } else {
    }
  }

  async addRestaurante() {
    const restaurantData = {
      nome: this.restaurante.nome,
      imagem: this.restaurante.imagem,
      localizacao: this.restaurante.localizacao,
      ponto_id: this.selectedPointId
    };

    const result = await this.supabaseService.addRestaurante(restaurantData);
    if (result.error) {
      console.error('Error adding restaurant:', result.error);
    } else {
    }
  }
}
