import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourist-spots-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, AppBarComponent],
  templateUrl: './tourist-spots-list.component.html',
  styleUrls: ['./tourist-spots-list.component.css']
})
export class TouristSpotsListComponent implements OnInit {
  hotelsByLocation: any[] = [];
  topRestaurants: any[] = [];

  constructor(private supabaseService: SupabaseService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadHotelsAndRestaurants();
  }

  async loadHotelsAndRestaurants() {
    this.hotelsByLocation = await this.supabaseService.getHotelsByLocation();
    this.topRestaurants = await this.supabaseService.getTopRestaurants();
  }

  dropHotelByLocation(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.hotelsByLocation, event.previousIndex, event.currentIndex);
  }

  dropTopRestaurants(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.topRestaurants, event.previousIndex, event.currentIndex);
  }

  confirmDelete(restaurantId: number): void {
    const confirmDialog = window.confirm("Are you sure you want to delete this restaurant?");
    if (confirmDialog) {
      this.deleteRestaurant(restaurantId);
    }
  }

  async deleteRestaurant(restaurantId: number): Promise<void> {
    await this.supabaseService.deleteRestaurant(restaurantId);
    this.loadHotelsAndRestaurants();
  }

  navigateToAdd(): void {
    this.router.navigate(['/tourist-spots-add']);
  }
}
