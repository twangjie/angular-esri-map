import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EsriMapComponent, PizzaPartyComponent} from './esri-map/esri-map.component';

import {CommonModule} from '@angular/common';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule, MatTabsModule,
  MatTooltipModule, MatTreeModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatSliderModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatTreeModule,
    ScrollingModule,
    MatTabsModule,
  ],
  declarations: [
    AppComponent,
    EsriMapComponent,
  ],
  entryComponents: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
