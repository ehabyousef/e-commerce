import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'products/:filter',
    renderMode: RenderMode.Client,
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client,
  },
];
