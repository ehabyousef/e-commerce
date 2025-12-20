import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // User-specific routes: Client-Side Rendering (no SSR needed)
  {
    path: 'user/**',
    renderMode: RenderMode.Client,
  },
  // Public routes: Server-Side Rendering (for SEO and performance)
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
