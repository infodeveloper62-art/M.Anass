import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio').then((m) => m.Portfolio),
  },
  {
    path: 'business-demo',
    loadComponent: () =>
      import('./business-site/business-site').then((m) => m.BusinessSite),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

