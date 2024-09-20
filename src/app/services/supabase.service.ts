import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthResponse } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      }
    });
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { data, error };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { data, error };
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error);
      throw error;
    }

    return data.session;
  }

  async getPontos() {
    const { data, error } = await this.supabase
      .from('ponto')
      .select('*');

    if (error) {
      console.error('Error fetching tourist points:', error);
      return [];
    }

    return data;
  }


  async getCidades() {
    const { data, error } = await this.supabase
      .from('ponto')
      .select('cidade')

    if (error) {
      console.error('Error fetching cities', error);
      return [];
    }

    return data.map((item: { cidade: string }) => item.cidade);
  }

  async getLocaisByCity(city: string) {
    const { data, error } = await this.supabase
      .from('ponto')
      .select('local')
      .eq('cidade', city);

    if (error) {
      console.error('Error fetching locations by city', error);
      return [];
    }

    return data.map((item: { local: string }) => item.local);
  }



  async getHotelsByLocation() {
    const session = await this.getSession();
    if (!session) {
      console.error('No active session found');
      return [];
    }

    const { data, error } = await this.supabase
      .from('hoteis')
      .select('*')
      .order('localizacao', { ascending: true });

    if (error) {
      console.error('Error fetching hotels by location', error);
      return [];
    }

    return data;
  }


  async getTopRestaurants() {
    const session = await this.getSession();
    if (!session) {
      console.error('No active session found');
      return [];
    }

    const { data, error } = await this.supabase
      .from('restaurantes')
      .select('*')
      .order('nome', { ascending: true });

    if (error) {
      console.error('Error fetching top restaurants', error);
      return [];
    }

    return data;
  }

  async addHotel(hotel: any) {
    const { error } = await this.supabase
      .from('hoteis')
      .insert([hotel]);

    if (error) {
      console.error('Error adding hotel:', error);
      return { error };
    }

    return {};
  }


  async addRestaurante(restaurant: any) {
    const { error } = await this.supabase
      .from('restaurantes')
      .insert([restaurant]);

    if (error) {
      console.error('Error adding restaurant:', error);
      return { error };
    }

    return {};
  }


  async addPonto(ponto: any) {
    const { data, error } = await this.supabase
      .from('ponto')
      .insert([ponto])
      .select();

    if (error) {
      console.error('Error adding tourist point', error);
      return null;
    }

    return data ? data[0] : null;
  }


  async deleteRestaurant(restaurantId: number) {
    const { error } = await this.supabase
      .from('restaurantes')
      .delete()
      .eq('id', restaurantId);

    if (error) {
      console.error('Error deleting restaurant', error);
    }
  }


  async deleteHotel(hotelId: number) {
    const { error } = await this.supabase
      .from('hoteis')
      .delete()
      .eq('id', hotelId);

    if (error) {
      console.error('Error deleting hotel', error);
    }
  }

}
