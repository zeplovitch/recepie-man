import { Routes } from '@angular/router';
import { RecBuilderComponent } from './rec-builder/rec-builder.component';
import { RecViewerComponent } from './rec-viewer/rec-viewer.component';
import { PageErrorComponent } from './page-error/page-error.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: RecBuilderComponent
  },
  {
    path: 'builder',
    component: RecBuilderComponent
  },
  {
    path: 'viewer',
    component: RecViewerComponent
  },

  {
    path: '**',
    component: PageErrorComponent
  }
];
