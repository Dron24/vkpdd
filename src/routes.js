import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';
export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  ROOT: 'root',
  TICKETS_PDD: 'tickets_pdd',
  TEXTBOOK: 'textbook',
  TESTS: 'tests',
  PROGRESS: 'progress',
  PROFILE: 'profile',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.ROOT, `/`, []), // 👈 перенаправление с корня
      createPanel(DEFAULT_VIEW_PANELS.TICKETS_PDD, `/tickets_pdd`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK, `/textbook`, []),
      createPanel(DEFAULT_VIEW_PANELS.TESTS, `/tests`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROGRESS, `/progress`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROFILE, `/profile`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
