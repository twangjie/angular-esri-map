import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Set our map properties
  mapCenter = [104.1, 30.5];
  basemapType = 'satellite';
  mapZoomLevel = 16;

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
