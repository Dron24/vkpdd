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
  TEXTBOOK_VIEWER: 'textbook_viewer',
  TEXTBOOK_SUBSECTION: 'textbook_subsection',
  TESTS: 'tests',
  PROGRESS: 'progress',
  PROFILE: 'profile',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.ROOT, `/`, []),
      createPanel(DEFAULT_VIEW_PANELS.TICKETS_PDD, `/tickets_pdd`, []),
      createPanel(DEFAULT_VIEW_PANELS.TESTS, `/tests`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROGRESS, `/progress`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROFILE, `/profile`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK, `/textbook`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK_VIEWER, `/textbook/:section`, []),
      createPanel(DEFAULT_VIEW_PANELS.TEXTBOOK_SUBSECTION, `/textbook/:section/:sub`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());

