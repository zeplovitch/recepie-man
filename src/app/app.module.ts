import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EquipmentComponent } from './rec-builder/equipment/equipment.component';
import { StepComponent } from './rec-builder/step/step.component';
import { ImgListComponent } from './rec-builder/step/img-list/img-list.component';
import { ImgSingleComponent } from './rec-builder/step/img-single/img-single.component';
import { RecBuilderComponent } from './rec-builder/rec-builder.component';
import { RecViewerComponent } from './rec-viewer/rec-viewer.component';

import { MainService } from './main.service';
import { PageErrorComponent } from './page-error/page-error.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
    StepComponent,
    ImgListComponent,
    ImgSingleComponent,
    RecBuilderComponent,
    RecViewerComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule {}
