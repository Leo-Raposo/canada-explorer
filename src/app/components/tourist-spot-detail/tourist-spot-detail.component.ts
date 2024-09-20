import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tourist-spot-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="dialog-content">
      <iframe class="video-iframe" [src]="sanitizer.bypassSecurityTrustResourceUrl(data.videoUrl)" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </div>
  `,
  styleUrls: ['./tourist-spot-detail.component.css']
})
export class TouristSpotDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { videoUrl: string }, public sanitizer: DomSanitizer) { }
}
