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
  HOME: 'home',
  MARKUP: 'markup',
  RULES: 'rules',
  TESTS: 'tests',
  PROGRESS: 'progress',
  PROFILE: 'profile',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, `/${DEFAULT_VIEW_PANELS.HOME}`, []),
      createPanel(DEFAULT_VIEW_PANELS.MARKUP, `/${DEFAULT_VIEW_PANELS.MARKUP}`, []),
      createPanel(DEFAULT_VIEW_PANELS.RULES, `/${DEFAULT_VIEW_PANELS.RULES}`, []),
      createPanel(DEFAULT_VIEW_PANELS.TESTS, `/${DEFAULT_VIEW_PANELS.TESTS}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROGRESS, `/${DEFAULT_VIEW_PANELS.PROGRESS}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROFILE, `/${DEFAULT_VIEW_PANELS.PROFILE}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
