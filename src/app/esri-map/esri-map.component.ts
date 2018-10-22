/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap: string = 'streets';


  constructor(public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.initializeMap();
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, webMercatorUtils] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/geometry/support/webMercatorUtils',
      ]);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      const mapView: esri.MapView = new EsriMapView(mapViewProperties);

      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        this.mapLoaded.emit(true);

      });

      mapView.on('click', (event) => {
        const clickCoordinates = {
          lat: event.mapPoint.latitude,
          lng: event.mapPoint.longitude,
        };

        const json = JSON.stringify(clickCoordinates);

        console.log('mapView click' + json);

        alert(json);

        // this.snackBar.open(json, '', {
        //   duration: 500,
        //   // verticalPosition: 'top',
        //   // horizontalPosition: 'end',
        //   location: 'top'
        // });
      });

      // https://community.esri.com/thread/213365-show-coordinates-wont-work-in-4x
      mapView.on('pointer-move', (event) => {

        const point = mapView.toMap({x: event.x, y: event.y});
        // the map is in web mercator but display coordinates in geographic (lat, long)
        const mp = webMercatorUtils.webMercatorToGeographic(point);

        const json = JSON.stringify(mp);

        console.log('mapView mouse move' + json);
        // mapView.on("mouse-drag", showCoordinates);
      });

      // // when the map is clicked create a buffer around the click point of the specified distance.
      // mapView.on("click", function(evt){
      //   mapView.graphics.clear();
      //   mapView.graphics.add(new Graphic(evt.mapPoint, symbol));
      //   mapView.infoWindow.setContent("X: " + evt.mapPoint.x.toString() + ", <br>Y: " + evt.mapPoint.y.toString());
      //   mapView.infoWindow.show(evt.mapPoint)
      // });

    } catch (error) {
      alert('We have an error: ' + error);
    }

  }

}
